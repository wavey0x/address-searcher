import React from "react";
import { render } from "react-dom";
// import { makeData, Logo, Tips } from "./Utils";
import { matchSorter } from 'match-sorter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'


// Import React Table
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
const axios = require('axios').default;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };
  }
  componentDidMount() {
    // axios.get('http://192.168.1.36:3001/addresses')
    axios.get('http://localhost:3001/addresses')
        .then((results) => {
            console.log(results)
            this.setState({ data: results })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
  }
  copyAddress(e, address){
    console.log(e)
    console.log(e.currentTarget)
    console.log(e.currentTarget.parentNode)
    const node = e.currentTarget;
    // const t = e.currentTarget;
    // const span = document.createElement("SPAN");
    // const text = document.createTextNode("This is a span element.");
    // span.appendChild(text);
    console.log(address);
    navigator.clipboard.writeText(address)

    // t.appendChild(span)
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data.data}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          columns={[
            {
                    Header: "ETH address",
                    accessor: "address",
                    filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value),
                    Cell: (props) => (
                        <span>
                        <FontAwesomeIcon
                            icon={faCopy}
                            className={"icon__"}
                            onClick={(e)=>this.copyAddress(e, props.value)}//e => {console.log(e)}}//navigator.clipboard.writeText(props.value)}}
                        /> 
                        <a href={"https://etherscan.io/address/"+ props.value} target="_blank">
                            {"  " + props.value}
                        </a>
                        </span>
                    )

            },
            {
                Header: "Strat/Vault Name",
                accessor: "name",
                filterMethod: (filter, row) =>
                    row[filter.id].toLowerCase().includes((filter.value).toLowerCase())
    
            },
            {
                Header: "Strat/Vault",
                id: 'vaultOrStrat',
                accessor: data => {
                    if(data.is_strategy) return "Strategy";
                    return "Vault";
                }//"is_strategy",

            },
            {
                Header: "API",
                id: 'api',
                accessor: 'api',
                filterMethod: (filter, row) =>
                    row[filter.id].includes(filter.value)

            },
          ]}
          defaultPageSize={50}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
