import { useEffect, useState } from "react";
import { deleteReaction, getAllReactions } from "../../managers/ReactionManager";
import { ReactionForm } from "./ReactionForm";

export const ReactionList = () => {
    const [reactions, setReactions] = useState([])
    const [editReaction, setEditReaction] = useState({ emoji: '' })
    const [deleteActive, setDeleteActive] = useState(false);
    const [reactionId, setReactionId] = useState(0)


    const loadReactions = () => {
        getAllReactions().then(reactionsData => setReactions(reactionsData))
    }


    useEffect(() => {
        loadReactions()
    }, [])

    const handleDelete = (reactionId) => {
        setDeleteActive(true)
        setReactionId(reactionId)
    }


    return (
        <>
            <section className="section">
                <div className="columns">
                    <div className="column">
                        <table className="table is-fullwidth">
                            <head>
                                <tr>
                                    <th>Reactions</th>
                                    <th></th>
                                </tr>
                            </head>
                            <body>
                                {
                                    reactions.map(reaction => (
                                        <tr key={reaction.id}>
                                            <td>{reaction.emoji}</td>
                                            <td>
                                                <div className="buttons">
                                                    <button className="button is-warning" onClick={() => { setEditReaction(reaction) }}>edit</button>
                                                    <button className="button is-danger" onClick={() => { handleDelete(reaction.id) }}>delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </body>
                        </table>
                    </div>
                    <div className="column">
                        <ReactionForm loadReactions={loadReactions} reaction={editReaction} setReaction={setEditReaction} />
                    </div>
                </div>
            </section>

            <div className={deleteActive ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Delete Reaction?</p>
                    </header>
                    <section className="modal-card-body">
                        Are you sure you want to delete this reaction?
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={() => {
                            deleteReaction(reactionId)
                                .then(loadReactions).then(() => {
                                    setDeleteActive(false)
                                    setReactionId(0)
                                })
                        }}>Delete</button>
                        <button className="button" onClick={() => { setDeleteActive(false) }}>Cancel</button>
                    </footer>
                </div>
            </div>
        </>
    )
}