import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls, LinkedInWidget } from "#components/index.js";
import { linkedInWidgetId } from "#constants/index.js";

const Contact = () => {
    return <>
    <div className="window-header">
        <WindowControls target="contact"/>
        <h2>My Contacts</h2>
    </div>
    <div className="overflow-y-auto pb-6" style={{ maxHeight: "calc(var(--window-height, 70vh) - 56px)" }}>
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

        <LinkedInWidget widgetId={linkedInWidgetId} />
    </div>
    </>;
};

const ContactWindow = WindowWrapper(Contact, 'contact');

export default ContactWindow;