import React from "react";
import Home from "./Home";

import './base.scss';

const App = () => {
    // FROM A DISASTER INTERVIEW

    // const data = [{
    //     name: "a", editor: 'vscode'
    // }, {
    //     name: "b", editor: 'vscode'
    // }, {
    //     name: "c", editor: 'unity'
    // }];

    // const total = data.length;

    // const editorCount = data.reduce((obj: any, v) => {
    //     obj[v.editor] = (obj[v.editor] || 0) + 1
    //     return obj;
    // }, {});

    // Object.keys(editorCount).forEach((item) => {
    //     editorCount[item] = `${((editorCount[item] / total) * 100).toFixed(1)}%`
    // });

    // console.log('editorCount', editorCount);

    return <Home />;
};

export default App;
