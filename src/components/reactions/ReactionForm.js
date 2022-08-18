import { createReaction, updateReaction } from "../../managers/ReactionManager"

export const ReactionForm = ({loadReactions, reaction, setReaction}) => {
    const saveReactionEvent = (event) => {
        event.preventDefault()
        if (reaction.id) {
            updateReaction(reaction).then(loadReactions)
        } else {
            createReaction(reaction).then((data) => {
                loadReactions(data)
                setReaction({ emoji: '' })
            })
        }
    }

    return (
        <>
            <form>
                <div className="field">
                    <label className="emoji">New Reaction:</label>
                    <div className="control">

                        <input
                            required
                            type="text"
                            className="input"
                            value={reaction.emoji}
                            onChange={
                                (evt) => {
                                    const copy = { ...reaction }
                                    copy.emoji = evt.target.value
                                    setReaction(copy)
                                }
                            } />
                    </div>
                </div>
                <div className="buttons">

                    <button
                        onClick={(evt) => {
                            saveReactionEvent(evt)
                            setReaction({ emoji: "" })
                        }}
                        className="button is-primary">
                        Save
                    </button>
                    {reaction.emoji ? <button onClick={() => setReaction({ emoji: "" })} className="button is-danger">Cancel</button> : ""}
                </div>
            </form>
        </>
    )
}