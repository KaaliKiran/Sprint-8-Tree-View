import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import ReactDOM from 'react-dom';

import React, { Component } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { NodeService } from '../service/NodeService';

export class TreeTableFilterDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            globalFilter1: null,
            globalFilter2: null
        };
        this.nodeservice = new NodeService();
    }

    componentDidMount() {
        this.nodeservice.getTreeTableNodes().then(data => this.setState({ nodes: data }));
    }

    getHeader(globalFilterKey) {
        return (
            <div className="p-text-right">
                <div className="p-input-icon-left">
                    <i className="pi pi-search"></i>
                    <InputText type="search" onInput={(e) => this.setState({ [`${globalFilterKey}`]: e.target.value })} placeholder="Global Search" size="50" />
                </div>
            </div>
        );
    }

    render() {
        let header1 = this.getHeader('globalFilter1');
        let header2 = this.getHeader('globalFilter2');

        return (
            <div>
                <div className="card">
                    <h5>Lenient Filter</h5>
                    <TreeTable value={this.state.nodes} globalFilter={this.state.globalFilter1} header={header1}>
                        <Column field="name" header="Name" expander filter></Column>
                        <Column field="size" header="Size" filter></Column>
                        <Column field="type" header="Type" filter></Column>
                    </TreeTable>
                </div>

                <div className="card">
                    <h5>Strict Filter</h5>
                    <TreeTable value={this.state.nodes} globalFilter={this.state.globalFilter2} header={header2} filterMode="strict">
                        <Column field="name" header="Name" expander filter></Column>
                        <Column field="size" header="Size" filter></Column>
                        <Column field="type" header="Type" filter></Column>
                    </TreeTable>
                </div>
            </div>
        )
    }
}
                
const rootElement = document.getElementById("root");
ReactDOM.render(<TreeTableFilterDemo />, rootElement);