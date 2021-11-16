

import React, { useMemo, useContext } from "react";
import styled from 'styled-components'
import { useTable } from 'react-table'
import { SimContext, SimDispatchContext } from './SimulationView';

import { CSVLink } from "react-csv";


const TableSheet = styled.table`
    // border-spacing: 0;
    display: block;
    // width: 1306px;
    height: 650px;
    max-height: 650px;
    overflow: auto;
`;

const TableHead = styled.thead`
  padding-bottom: 1rem;
  // width: 1306px;
`;

const Header = styled.tr``;

const Th = styled.th`
  position: sticky;
  top: 0;
  width: 90px;
  background-color: grey;
  padding: 0.5rem 1rem;
  border-top: 1px solid black;
  border-bottom: 1px solid #6F7A92;
  line-height: 18px;
  font-size: 14px;
  font-family: 'Nanum Barun Gothic';
  font-style: normal;
  font-weight: normal;
  text-align: center;
  color: white;
`;

const Tr = styled.tr`
    :last-child {
        td {
        border-bottom: 0;
        }
    }
`

const Td = styled.td`
  padding: 0.7rem 0.7rem;
  margin: 0;
  max-width: 30rem;
  border-bottom: 1px solid #6F7A92;
  font-size: 14px;
  font-family: 'Nanum Barun Gothic';
  font-style: normal;
  font-weight: normal;
  text-align: center;
  color: rgba(51, 51, 51, 1);
`;

const Table = ({ columns, data }) => {
  const simItems = useContext(SimContext);
  const dispatch = useContext(SimDispatchContext);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, initialState: {
      hiddenColumns: ["simulationId"]
    } });

  return (
    <TableSheet {...getTableProps()}>
      <TableHead>
        {headerGroups.map(header => (
          <Header {...header.getHeaderGroupProps()}>
            {header.headers.map(col => (
              <Th {...col.getHeaderProps()}>{col.render('Header')}</Th>
            ))}
          </Header>
        ))}
      </TableHead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()} onClick={() => {
              if(simItems.some(item => item.simNo === row.original.simulationId && item.status === false)) {
                dispatch({type: 'REMOVESIMNO',
                        simno: row.original.simulationId,
                        seq: row.original.seq});
              } else if (simItems.some(item => item.simNo === row.original.simulationId)) {
                dispatch({type: 'REMOVESIMNO',
                        simno: row.original.simulationId,
                        seq: row.original.seq});
                dispatch({type: 'CHANGESTATUS',
                simno: row.original.simulationId});
              } else {
                dispatch({type: 'ADDSIMNO',
                        simno: row.original.simulationId,
                        seq: row.original.seq});
                dispatch({type: 'CHANGESTATUS',
                        simno: row.original.simulationId});
              }
            }}>
              {row.cells.map(cell => (
                <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
              ))}
            </Tr>
          );
        })}
      </tbody>
    </TableSheet>
  );
};


const SimNo = ({values}) => {
    return (
        <div style={{ textAlign: 'center'}}>
            #{values}
        </div>
      );
}

const CommentsTags = styled.span`
  // padding-right: 8rem;
  word-break: break-all;
`;

const Comments = ( {values} ) => {

    return (
    <div style={{ textAlign: 'left' }}>
        <CommentsTags values={values}>{values}</CommentsTags>
    </div>
  );
};

const csvHeaders = [
  { label: "Sim No.", key: "seq" },
  { label: "Comments", key: "comments" },
  { label: "Start Date", key: "startDate" },
  { label: "End Date", key: "endDate" },
];

const prettyLink  = {
  fontSize: 14,
  fontWeight: 500,
  height: 52,
  padding: '0 48px',
  borderRadius: 5,
  textDecoration: "none",
  color: "black"
};

const HistoryTable = (props) => {


  const columnData = [
      {
          accessor: 'seq',
          Header: "Sim No.",
          Cell: ({ cell: { value } }) => <SimNo values={value} />,
      },
      {
          accessor: 'simulationId',
          isVisible: false,
      },
      {
          accessor: 'comments',
          Header: () => (<div style={{width: 120}}>Comments</div>),
          Cell: ({ cell: { value } }) => <Comments values={value} />,
      },
      {
          accessor: 'startDate',
          Header: () => (<div style={{width: 110}}>Start Date</div>),
      },
      {
          accessor: 'endDate',
          Header: () => (<div style={{width: 110}}>End Date</div>),
      },
    ]

    const columns = useMemo(() => columnData, []);

    return (
        <div className="sim-history-wrapper">
            <div id="Simulation_History">
                <span style={{ marginRight: "225px"}}>Simulation History</span>
              <span className="csv-download">
                <CSVLink data={props.data} headers={csvHeaders} filename="simulation_history.csv" style={prettyLink}>
                <span style={{ marginRight: "5px"}}>
                    <img src="download-icon.svg" width="15px" height="15px"/>
                </span>
                Download CSV
                </CSVLink>
              </span>
            </div>

            <div className="sim-history">
                <Table columns={columns} data={props.data}/>
            </div>

            <div id="n_17967">
                <div id="n_17965">
                    <div id="n_17966">
                        <svg className="n_3" viewBox="-13759.001 3148.999 18.001 18.004">
                            <path id="n_3" d="M -13748.82421875 3167.0029296875 L -13748.8251953125 3167.0029296875 L -13751.1728515625 3167.0029296875 L -13751.8212890625 3164.395751953125 C -13752.3193359375 3164.255859375 -13752.78125 3164.0634765625 -13753.2294921875 3163.808837890625 L -13755.533203125 3165.197021484375 L -13757.1943359375 3163.5361328125 L -13755.8095703125 3161.23291015625 C -13756.05859375 3160.787353515625 -13756.2548828125 3160.31298828125 -13756.3935546875 3159.823974609375 L -13759.0009765625 3159.1748046875 L -13759.0009765625 3156.82666015625 L -13756.3935546875 3156.177490234375 C -13756.25390625 3155.683349609375 -13756.0556640625 3155.209228515625 -13755.806640625 3154.768798828125 L -13757.1943359375 3152.465576171875 L -13755.533203125 3150.8046875 L -13753.23046875 3152.189208984375 C -13752.7880859375 3151.9384765625 -13752.3271484375 3151.74755859375 -13751.8212890625 3151.605712890625 L -13751.1728515625 3148.998779296875 L -13748.82421875 3148.998779296875 L -13748.1748046875 3151.605712890625 C -13747.66796875 3151.749267578125 -13747.1943359375 3151.947021484375 -13746.7666015625 3152.19287109375 L -13744.462890625 3150.8046875 L -13742.8056640625 3152.465576171875 L -13744.1865234375 3154.768798828125 C -13743.939453125 3155.211669921875 -13743.7431640625 3155.68603515625 -13743.603515625 3156.177490234375 L -13741 3156.82666015625 L -13741 3159.1748046875 L -13743.603515625 3159.823974609375 C -13743.7451171875 3160.321533203125 -13743.9423828125 3160.795654296875 -13744.1904296875 3161.23291015625 L -13744.1865234375 3161.23291015625 L -13742.8056640625 3163.5361328125 L -13744.462890625 3165.197021484375 L -13746.7666015625 3163.812255859375 C -13747.2109375 3164.06103515625 -13747.685546875 3164.25732421875 -13748.1748046875 3164.395751953125 L -13748.82421875 3167.002197265625 L -13748.82421875 3167.0029296875 Z M -13749.998046875 3155.6630859375 C -13751.287109375 3155.6630859375 -13752.3359375 3156.711669921875 -13752.3359375 3158.000732421875 C -13752.3359375 3159.289794921875 -13751.287109375 3160.338623046875 -13749.998046875 3160.338623046875 C -13748.7099609375 3160.338623046875 -13747.6611328125 3159.289794921875 -13747.6611328125 3158.000732421875 C -13747.6611328125 3156.711669921875 -13748.7099609375 3155.6630859375 -13749.998046875 3155.6630859375 Z">
                            </path>
                        </svg>
                    </div>
                </div>
                <svg className="n_4985">
                    <rect id="n_4985" rx="0" ry="0" x="0" y="0" width="20" height="20">
                    </rect>
                </svg>
            </div>
        </div>
    );
}

export default HistoryTable