import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

export function PlaygroundEditor({ value, onChange, language = 'js'}: {value: string; onChange: (v: string) => void; language?: 'js'|'html';}) {
    return (
        <div className="rounded-xl overflow-hidden border border-white/10">
            <CodeMirror
                value={value}
                height="260px"
                theme={"dark"}
                extensions={language === 'js' ? [javascript({jsx: true, typescript: false})] : []}
                onChange={onChange}
                basicSetup={{ lineNumbers: true, highlightActiveLine: true, bracketMatching: true, autocompletion: true}}/>
        </div>
    );
}