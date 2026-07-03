import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components/index.js";

const Blogs = () => {
    return <>
    <div id="window-header">
        <WindowControls target="blogs"/>
        <h2>Benchmarking Blog</h2>
    </div>
        <ul>
            <li>
                <a className="items-center" href="https://github.com/dargem"><img src="/files/images/github.png" alt="logo" className="h-8"/> Github </a>
            </li>
            <li>
                <a href="https://linkedin.com/in/tristan-dyson"><img src="/files/images/linkedin.png" alt="logo" className="h-8"/> Linkedin</a>
            </li>
        </ul>

        <h3>Emails:</h3>

        <p>
            tristanxdyson@gmail.com
            <br/>
            c3412030@uon.edu.au
        </p>
    <div>
        
    </div>
    </>;
};

const BlogsWindow = WindowWrapper(Blogs, 'blogs');

export default BlogsWindow;