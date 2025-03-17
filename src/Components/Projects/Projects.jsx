import './Projects.css'
import SO from '../SO/SO'

export default function Projects({ project }) {

    return (
        <>
            <div className="projContentDiv">
                <SO project={project}/>
            </div>
        </>
    )
}