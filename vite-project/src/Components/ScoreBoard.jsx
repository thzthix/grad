
const ScoreBoard=({score})=>{

    const style={
        fontSize:"40px",
        backgroundColor:"black",
        color:"white",
        padding:"4px 10px",
        borderRadius:"4px",
        textAlign:"center",
        marginLeft:"700px",
    
    }

    return <div style={style}>{score}</div>



}
export default ScoreBoard