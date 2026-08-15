import '../styles/SideNode.css';


function SideNode ({onSetStartNode}) {
    return (
    <aside className='side-node-container'>
        <h2 className='side-node-title'>
            NODO INCIAL
        </h2>
        <form onSubmit={onSetStartNode} className='side-node-form' autoComplete="off">
            <input className='side-node-form-input' type="text" name="initialNode" placeholder='A'/>
            <button className='side-node-form-button' type="submit">Establecer</button>
        </form>
    </aside>
    )
}

export default SideNode;