import { useAxios } from 'frontend-essentials'
import React, { useContext, useState } from 'react'
import { END_ALL_CONNECTION_URL, END_CONNECTION_URL, SHOW_ALL_CONNECTIONS_URL } from '../../routes/urls'
import Loading from '../../shared/components/loading/Loading'
import { If } from 'mg-js'
import MyModal from '../../shared/components/Modal/MyModal'
import UserStorage from '../../context/userStore'

const MyConnections = () => {
    const { logout } = useContext(UserStorage)
    const [connections, setConnections] = useState([])
    const [idToDelete, setIdToDelete] = useState()
    const [showEndAllModal, setShowEndAllModal] = useState(false)
    const [showEndModal, setShowEndModal] = useState(false)
    const { loading, data } = useAxios({
        method: "get",
        url: SHOW_ALL_CONNECTIONS_URL,
        camelCased: true,
        onSuccess: ({ data }) => setConnections(data)
    })
    const { loading: deleteLoad, activate } = useAxios({
        method: "delete",
        manual: true
    })
    const endConnection = () => {
        activate({
            url: END_CONNECTION_URL + `?id=${idToDelete}`,
            onSuccess: () => {
                setConnections(connections.filter(c => c.tokenId != idToDelete))
                logout()
            }
        })
    }
    const endAllConnections = () => {
        activate({
            url: END_ALL_CONNECTION_URL,
            method: "delete",
            onSuccess: () => {
                setConnections([])
                logout()
            }
        })
    }


    if (loading || deleteLoad) return <Loading />

    return (
        <div className='w-75 mx-auto mt-4'>
            <If condition={loading}>
                <Loading />
            </If>
            <div className='d-flex justify-content-center'>
                <button onClick={() => setShowEndAllModal(true)} className='btn btn-danger'>end all connections</button>
            </div>
            <h2>devices connections</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">browser name</th>
                        <th scope="col">browser platform</th>
                        <th scope="col">connction date</th>
                        <th scope="col">end connection</th>
                    </tr>
                </thead>
                {/* endConnection(c.tokenId) */}
                <tbody>
                    {connections.map((c, i) =>
                        <tr key={c.tokenId}>
                            <th scope="row">{i + 1}</th>
                            <td>{c.browserName}</td>
                            <td>{c.browserPlatform}</td>
                            <td>{c.connectionDate}</td>
                            <td><button onClick={() => { setShowEndModal(true); setIdToDelete(c.tokenId) }} className='btn btn-danger'>end</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            <If condition={!connections.length}><h2 className='text-center'>no connections</h2></If>
            <MyModal
                show={showEndAllModal}
                title="warnning"
                closeModal={() => setShowEndAllModal(false)}
                body="are you shure you wan't to disconnect all the connctions, this will disconnect you!"
                leftBtnText="no"
                rightBtnText="yes"
                submit={endAllConnections}
            />
            <MyModal
                show={showEndModal}
                title="warnning"
                closeModal={() => setShowEndModal(false)}
                body="are you shure you wan't to disconnect this connctions, this will disconnect you!"
                leftBtnText="no"
                rightBtnText="yes"
                submit={endConnection}
            />
        </div>
    )
}

export default MyConnections