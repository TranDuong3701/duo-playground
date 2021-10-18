import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";

import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/xml-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/keymap/sublime";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/hint/css-hint";
import "codemirror/addon/lint/lint";
import "codemirror/addon/display/autorefresh";

import { Controlled as ControlledEditor } from "react-codemirror2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons";

const Editor = (props) => {
    const { language, displayName, value, onChange } = props;
    const [open, setOpen] = useState(true);

    const handleChange = (editor, data, value) => {
        editor.showHint({ completeSingle: false });
        onChange(value);
    };

    return (
        <div className={`editor-container ${open ? "" : "collapsed"}`}>
            <div className="editor-title">
                <span>{displayName}</span>
                <button
                    type="button"
                    className="expand-collapse-btn"
                    onClick={() => setOpen((prevOpen) => !prevOpen)}
                >
                    <FontAwesomeIcon
                        icon={open ? faCompressAlt : faExpandAlt}
                    />
                </button>
            </div>
            <ControlledEditor
                onBeforeChange={handleChange}
                value={value}
                className="code-mirror-wrapper"
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme: "material",
                    lineNumbers: true,
                    extraKeys: { "Ctrl-Space": "autocomplete" },
                    keyMap: "sublime",
                    matchBrackets: true,
                    autoCloseBrackets: true,
                    foldGutter: true,
                }}
            />
        </div>
    );
};

export default Editor;
