import React, {
  PropsWithChildren,
  useEffect,
  useReducer,
  useState
} from 'react'
import { SOCKET_URL } from '../conf/conf'
import { useSocket } from '../hooks/useSocket'
import { User } from '../interfaces/userInterface'
import {
  defaultSocketContextState,
  SocketContextProvider,
  SocketReducer
} from './SocketContext'

export interface ISocketContextComponentProps extends PropsWithChildren {
  loggedUser: User | null
}

const SocketContextComponent: React.FunctionComponent<
  ISocketContextComponentProps
> = ({ children, loggedUser }) => {
  const socket = useSocket(SOCKET_URL, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false
  })

  const [SocketState, SocketDispatch] = useReducer(
    SocketReducer,
    defaultSocketContextState
  )
  const [loading, setLoading] = useState(true)

  const StartListeners = (): void => {
    /** User connected event */
    socket.on('user_connected', (users: string[]) => {
      // console.info('User connected message received')
      SocketDispatch({ type: 'update_users', payload: users })
    })

    /** User Disconnected event */
    socket.on('user_disconnected', (uid: string) => {
      // console.info('User disconnected message received')
      SocketDispatch({ type: 'remove_user', payload: uid })
    })

    /** Connection / reconnection listeners */
    socket.io.on('reconnect', (attempt) => {
      // console.info(`Reconnected on attempt: ${attempt}`)
      void SendHandshake()
    })

    socket.io.on('reconnect_attempt', (attempt) => {
      // console.info(`Reconnection Attempt: ${attempt}`)
    })

    socket.io.on('reconnect_error', (error) => {
      console.info('Reconnection error: ', error)
    })

    socket.io.on('reconnect_failed', () => {
      console.info('Reconnection failure.')
      alert(
        'We are unable to connect you to the chat service.  Please make sure your internet connection is stable or try again later.'
      )
    })
  }

  const SendHandshake = async (): Promise<void> => {
    // console.info('Sending handshake to server ...')

    socket.emit(
      'handshake',
      loggedUser,
      async (uid: string, users: string[]) => {
        // console.info('User handshake callback message received')
        SocketDispatch({ type: 'update_uid', payload: uid })
        SocketDispatch({ type: 'update_users', payload: users })

        setLoading(false)
      }
    )
  }

  useEffect(() => {
    socket.connect()
    SocketDispatch({ type: 'update_socket', payload: socket })
    StartListeners()
    void SendHandshake()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <p>... loading Socket IO ....</p>

  return (
    <SocketContextProvider value={{ SocketState, SocketDispatch }}>
      {children}
    </SocketContextProvider>
  )
}

export default SocketContextComponent
