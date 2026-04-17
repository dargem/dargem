import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components/index.js";

const Contact = () => {
    return <>
    <div id="window-header">
        <WindowControls target="contact"/>
        <h2>My Contacts</h2>
    </div>
        <ul>
            <li>
                <a href="https://github.com/dargem"><h3>Github</h3></a>
            </li>
            <li>
                <a href="https://linkedin.com/in/tristan-dyson">Linkedin</a>
            </li>
        </ul>
    <div>
        
    </div>
    </>;
};

const ContactWindow = WindowWrapper(Contact, 'contact');

export default ContactWindow;