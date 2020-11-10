import React, { Component } from 'react';
import './App.css';
import Table from '../src/components/Table';
import Button from '../src/components/Button';
import Popup from '../src/components/Popup';
import TabPanel from '../src/components/TabPanel';
import { Radar } from 'react-chartjs-2';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprocess: "",
      newarrival: 0,
      newburst: 0,
      newpriority: 0,
      processData: [
        // {
        //   process: "p1",
        //   arrival: 0,
        //   burst: 10,
        //   priority: 2,
        //   fcfswt: 0,
        //   fcfstat: 0,
        //   sjfwt: 0,
        //   sjftat: 0,
        //   pwt: 0,
        //   ptat: 0,
        //   rrwt: 0,
        //   rrtat: 0,
        //   service_time: 0
        // },
        // {
        //   process: "p2",
        //   arrival: 1,
        //   burst: 5,
        //   priority: 0,
        //   fcfswt: 0,
        //   fcfstat: 0,
        //   sjfwt: 0,
        //   sjftat: 0,
        //   pwt: 0,
        //   ptat: 0,
        //   rrwt: 0,
        //   rrtat: 0,
        //   service_time: 0
        // },
        // {
        //   process: "p3",
        //   arrival: 3,
        //   burst: 8,
        //   priority: 1,
        //   fcfswt: 0,
        //   fcfstat: 0,
        //   sjfwt: 0,
        //   sjftat: 0,
        //   pwt: 0,
        //   ptat: 0,
        //   rrwt: 0,
        //   rrtat: 0,
        //   service_time: 0
        // },
        // {
        //   process: "p4",
        //   arrival: 2,
        //   burst: 2,
        //   priority: 7,
        //   fcfswt: 0,
        //   fcfstat: 0,
        //   sjfwt: 0,
        //   sjftat: 0,
        //   pwt: 0,
        //   ptat: 0,
        //   rrwt: 0,
        //   rrtat: 0,
        //   service_time: 0
        // },
        // {
        //   process: "p5",
        //   arrival: 4,
        //   burst: 4,
        //   priority: 8,
        //   fcfswt: 0,
        //   fcfstat: 0,
        //   sjfwt: 0,
        //   sjftat: 0,
        //   pwt: 0,
        //   ptat: 0,
        //   rrwt: 0,
        //   rrtat: 0,
        //   service_time: 0
        // }
      ],
      quantum: 0,
      selection: 0,
      totfcfswt: 0,
      totfcfstat: 0,
      totsjfwt: 0,
      totsjftat: 0,
      totpwt: 0,
      totptat: 0,
      totrrwt: 0,
      totrrtat: 0,
      avgfcfswt: 0,
      avgfcfstat: 0,
      avgsjfwt: 0,
      avgsjftat: 0,
      avgpwt: 0,
      avgptat: 0,
      avgrrwt: 0,
      avgrrtat: 0,
      showCalculatedData: false,
      deleteIndex: "",
      addProcessPopup: {
        show: false,
        headline: "",
        content: <div></div>,
        actions: [
          {
            text: "Cancel",
            buttonType: "red",
            onClick: this.hideProcessPopup
          }
        ],
        cancelAction: {
          show: true,
          onClick: this.hideProcessPopup
        },
        color: "pink"
      }
    }
  }

  calculate = () => {
    this.fcfs()
    this.sjf()
    this.priority()
    this.roundRobin()
    this.setState({
      showCalculatedData: true
    })
  }

  changeSelection = (index) => {
    this.setState({
      selection: index
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: parseInt(event.target.value)
    })
  }
  handleNameChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  showAddProcessPopup = (process, type) => {
    const { processData } = this.state
    let index, newprocess, newarrival, newburst, newpriority

    let popupContent = <div>
      <p>Add Process Details</p>
      <div className="popup-input-div">
        <label>Process name: </label>
        <input className="form-input" type="text" name="newprocess" value={newprocess} onChange={this.handleNameChange} />
      </div>
      <div className="popup-input-div">
        <label>Arrival Time: </label>
        <input className="form-input" type="number" name="newarrival" value={newarrival} onChange={this.handleChange} />
      </div>
      <div className="popup-input-div">
        <label>Burst Time: </label>
        <input className="form-input" type="number" name="newburst" value={newburst} onChange={this.handleChange} />
      </div>
      <div className="popup-input-div">
        <label>Priority: </label>
        <input className="form-input" type="number" name="newpriority" value={newpriority} onChange={this.handleChange} />
      </div>
    </div>

    this.setState({
      editIndex: index,
      addProcessPopup: {
        show: true,
        headline: "Add Process",
        content: popupContent,
        actions: [
          {
            text: "Cancel",
            buttonType: "warning",
            onClick: this.hideProcessPopup
          },
          {
            text: "Add",
            buttonType: "primary",
            onClick: this.processDetails
          }
        ],
        cancelAction: {
          show: true,
          onClick: this.hideProcessPopup
        },
        color: "pink"
      }
    })
  }

  hideProcessPopup = () => {
    this.setState({
      addProcessPopup: {
        show: false,
        headline: "",
        content: <div></div>,
        actions: [
          {
            text: "Cancel",
            buttonType: "warning",
            onClick: this.hideProcessPopup
          },
          {
            text: "Add",
            buttonType: "primary",
            onClick: this.processDetails
          }
        ],
        cancelAction: {
          show: true,
          onClick: this.hideProcessPopup
        },
        color: "pink"
      }
    })
  }

  processDetails = (type) => {
    const { newprocess, newarrival, newburst, newpriority } = this.state
    console.log("data", newprocess, newarrival, newburst, newpriority)
    this.setState({
      processData: this.state.processData.concat({
        process: newprocess, arrival: newarrival, burst: newburst, priority: newpriority, fcfswt: 0,
        fcfstat: 0,
        sjfwt: 0,
        sjftat: 0,
        pwt: 0,
        ptat: 0,
        rrwt: 0,
        rrtat: 0,
        service_time: 0
      }),
      addProcessPopup: {
        show: false
      }
    })
  }

  fcfs = () => {
    const { processData } = this.state
    let { totfcfswt, avgfcfswt, totfcfstat, avgfcfstat } = this.state

    for (let i = 0; i < processData.length; i++) {
      if (i === 0) {
        processData[i].service_time = 0
        processData[i].fcfswt = 0
        processData[i].fcfstat = processData[i].burst
      } else {
        processData[i].service_time = processData[i - 1].service_time + processData[i - 1].burst
        processData[i].fcfswt = processData[i].service_time - processData[i].arrival
        processData[i].fcfstat = processData[i].fcfswt + processData[i].burst
      }
      totfcfswt = totfcfswt + processData[i].fcfswt
      totfcfstat = totfcfstat + processData[i].fcfstat
      console.log("fcfs", processData[i].fcfswt, processData[i].fcfstat)
    }
    avgfcfswt = totfcfswt / processData.length
    avgfcfstat = totfcfstat / processData.length

    this.setState({
      processData,
      totfcfswt: totfcfswt,
      avgfcfswt: avgfcfswt,
      totfcfstat: totfcfstat,
      avgfcfstat: avgfcfstat
    })
  }

  sjf = () => {
    const { processData } = this.state
    let { totsjfwt, avgsjfwt, totsjftat, avgsjftat } = this.state

    let rt = []
    for (let i = 0; i < processData.length; i++)
      rt[i] = processData[i].burst;

    let complete = 0, time = 0, minm = 9999, shortest = 0, finish_time;
    let check = false;

    // Process until all processes gets completed 
    while (complete !== processData.length) {

      // Find process with minimum remaining time among the processes that arrives till the current time` 
      for (let j = 0; j < processData.length; j++) {
        if ((processData[j].arrival <= time) &&
          (rt[j] < minm) && rt[j] > 0) {
          minm = rt[j];
          shortest = j;
          check = true;
        }
      }
      if (check === false) {
        time++;
        continue;
      }
      // Reduce remaining time by one 
      rt[shortest]--;
      // Update minimum 
      minm = rt[shortest];
      if (minm === 0)
        minm = 9999;

      // If a process gets completely executed 
      if (rt[shortest] === 0) {
        // Increment complete 
        complete++;
        check = false;
        // Find finish time of current process 
        finish_time = time + 1;

        // Calculate waiting time 
        processData[shortest].sjfwt = finish_time - processData[shortest].burst - processData[shortest].arrival;

        if (processData[shortest].sjfwt < 0)
          processData[shortest].sjfwt = 0;
      }
      time++;
    }
    for (let i = 0; i < processData.length; i++) {
      processData[i].sjftat = processData[i].burst + processData[i].sjfwt;
      totsjfwt = totsjfwt + processData[i].sjfwt
      totsjftat = totsjftat + processData[i].sjftat
    }
    avgsjfwt = totsjfwt / processData.length
    avgsjftat = totsjftat / processData.length

    this.setState({
      processData,
      totsjfwt: totsjfwt,
      totsjftat: totsjftat,
      avgsjfwt: avgsjfwt,
      avgsjftat: avgsjftat
    })
  }


  priority = () => {
    // const { processData } = this.state
    let { totpwt, totptat, avgpwt, avgptat, processData } = this.state
    let n = processData.length
    processData.sort((a, b) => {
      if (a.arrival === b.arrival) {
        return a.priority > b.priority;
      }
      else {
        return a.arrival < b.arrival;
      }
    })
    console.log("process", processData)
    // let process_order = []
    // for (let i = 0; i < n; i++) {
    //   if (processData[i].arrival === processData[i + 1].arrival) {
    //     if (processData[i].priority < processData[i + 1].priority)
    //       process_order.push(processData[i])
    //   }
    //   else if (processData[i].arrival < processData[i + 1].arrival) {
    //     process_order.push(processData[i])
    //   }
    // }
    // console.log("process order", process_order)

    let service = [];

    // Initilising initial elements of the arrays 
    service[0] = processData[0].arrival;
    processData[0].pwt = 0;


    for (let i = 1; i < processData.length; i++) {
      service[i] = processData[i - 1].burst + service[i - 1];

      processData[i].pwt = processData[i - 1].burst + processData[i - 1].pwt;

      // If waiting time is negative, change it into zero 

      if (processData[i].pwt < 0) {
        processData[i].pwt = 0;
      }

    }
    for (let i = 0; i < n; i++) {
      processData[i].ptat = processData[i].burst + processData[i].pwt;
      totpwt = totpwt + processData[i].pwt
      totptat = totptat + processData[i].ptat
    }
    avgpwt = totpwt / processData.length
    avgptat = totptat / processData.length

    this.setState({
      processData,
      totpwt: totpwt,
      totptat: totptat,
      avgpwt: avgpwt,
      avgptat: avgptat
    })

  }

  roundRobin = () => {
    const { processData, quantum } = this.state
    let { totrrwt, totrrtat, avgrrtat, avgrrwt } = this.state

    // Make a copy of burst times bt[] to store remaining burst times. 
    let rem_bt = [];
    for (let i = 0; i < processData.length; i++)
      rem_bt[i] = processData[i].burst;

    let time = 0

    // Keep traversing processes in round robin manner until all of them are not done. 
    while (1) {
      let done = true;

      // Traverse all processes one by one repeatedly 
      for (let i = 0; i < processData.length; i++) {
        // If burst time of a process is greater than 0 then only need to process further 
        if (rem_bt[i] > 0) {
          done = false;
          if (rem_bt[i] > quantum) {
            // Increase the value of time i.e. shows how much time a process has been processed 
            time += quantum;
            // Decrease the burst_time of current process by quantum 
            rem_bt[i] -= quantum;
          }

          // If burst time is smaller than or equal to quantum.
          else {
            // Increase the value of t i.e. shows how much time a process has been processed 
            time = time + rem_bt[i];
            // Waiting time is current time minus time used by this process 
            processData[i].rrwt = time - processData[i].burst;
            // As the process gets fully executed make its remaining burst time = 0 
            rem_bt[i] = 0;
          }
        }
      }

      // If all processes are done 
      if (done === true)
        break;
    }

    //Calculate turn around time
    for (let i = 0; i < processData.length; i++) {
      processData[i].rrtat = processData[i].burst + processData[i].rrwt;
      totrrwt = totrrwt + processData[i].rrwt
      totrrtat = totrrtat + processData[i].rrtat
    }
    avgrrwt = totrrwt / processData.length
    avgrrtat = totrrtat / processData.length

    //set state
    this.setState({
      processData,
      totrrwt: totrrwt,
      totrrtat: totrrtat,
      avgrrwt: avgrrwt,
      avgrrtat: avgrrtat
    })
  }

  showDeletePopup = (process) => {
    const { processData } = this.state
    const index = processData.findIndex(obj => obj.process === process)
    let popupContent = <div>
      <span>Are you sure you want to delete <b>{process}</b>?</span>
    </div>

    this.setState({
      deleteIndex: index,
      addProcessPopup: {
        show: true,
        headline: "Delete Process",
        content: popupContent,
        actions: [
          {
            text: "Cancel",
            buttonType: "warning",
            onClick: this.hideProcessPopup
          },
          {
            text: "Delete",
            buttonType: "primary",
            onClick: this.deleteProcess
          }
        ],
        cancelAction: {
          show: true,
          onClick: this.hideProcessPopup
        },
        color: "red"
      }
    })
  }

  deleteProcess = () => {
    const { deleteIndex, processData } = this.state
    processData.splice(deleteIndex, 1)
    this.setState({
      addProcessPopup: {
        show: false
      }
    })
  }

  render() {
    const { processData, selection, addProcessPopup, quantum, avgfcfstat, avgfcfswt, avgptat, avgpwt, avgrrtat, avgrrwt, avgsjftat, avgsjfwt, showCalculatedData } = this.state;

    const columns = [
      {
        name: "Process",
        selector: "process"
      },
      {
        name: "Arrival Time",
        selector: "arrival"
      },
      {
        name: "Burst Time",
        selector: "burst"
      },
      {
        name: "Priority",
        selector: "priority"
      }
    ]

    const fcfsColumn = [
      {
        name: "Process",
        selector: "process"
      },
      {
        name: "Arrival Time",
        selector: "arrival"
      },
      {
        name: "Burst Time",
        selector: "burst"
      },
      {
        name: "Waiting Time",
        selector: "fcfswt"
      },
      {
        name: "Turn Around Time",
        selector: "fcfstat"
      }
    ]

    const sjfColumn = [
      {
        name: "Process",
        selector: "process"
      },
      {
        name: "Arrival Time",
        selector: "arrival"
      },
      {
        name: "Burst Time",
        selector: "burst"
      },
      {
        name: "Waiting Time",
        selector: "sjfwt"
      },
      {
        name: "Turn Around Time",
        selector: "sjftat"
      }
    ]

    const priorityColumn = [
      {
        name: "Process",
        selector: "process"
      },
      {
        name: "Arrival Time",
        selector: "arrival"
      },
      {
        name: "Burst Time",
        selector: "burst"
      },
      {
        name: "Priority",
        selector: "priority"
      },
      {
        name: "Waiting Time",
        selector: "pwt"
      },
      {
        name: "Turn Around Time",
        selector: "ptat"
      }
    ]

    const rrColumn = [
      {
        name: "Process",
        selector: "process"
      },
      {
        name: "Burst Time",
        selector: "burst"
      },
      {
        name: "Waiting Time",
        selector: "rrwt"
      },
      {
        name: "Turn Around Time",
        selector: "rrtat"
      }
    ]

    const actions = [
      {
        icon: "far fa-trash-alt",
        trigger: (process) => this.showDeletePopup(process),
        text: "Delete",
        buttonClass: "action-link action-red"
      }
    ]
    const tabs = [
      "First Come First Serve",
      "Shortest Job First (Preemptive)",
      "Priority",
      "Round Robin"
    ]

    const data = {
      labels: [
        "First Come First Serve",
        "Shortest Job First",
        "Priority",
        "Round Robin"
      ],
      datasets: [
        {
          label: "Waiting Time",
          backgroundColor: "rgba(255,147,78,0.5)",
          pointBackgroundColor: "rgb(255,147,78)",
          data: [
            parseFloat(avgfcfswt).toFixed(2),
            parseFloat(avgsjfwt).toFixed(2),
            parseFloat(avgpwt).toFixed(2),
            parseFloat(avgrrwt).toFixed(2)
          ]
        }, {
          label: 'Turn Around Time',
          backgroundColor: "rgba(255,78,106,0.5)",
          pointBackgroundColor: "rgba(255,78,106,1)",
          data: [
            parseFloat(avgfcfstat).toFixed(2),
            parseFloat(avgsjftat).toFixed(2),
            parseFloat(avgptat).toFixed(2),
            parseFloat(avgrrtat).toFixed(2)
          ]
        }
      ]
    }

    const options = {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Comparison between Scheduling Algorithms',
        fontColor: '#ebeef0',
        fontSize: 14,
        padding: 25
      },
      scale: {
        width: 500,
        reverse: false,
        gridLines: {
          color: '#c5c9cc'
        },
        angleLines: {
          color: '#c5c9cc'
        },
        ticks: {
          fontColor: '#c5c9cc',
          backdropColor: "#212529",
          beginAtZero: true
        },
        pointLabels: {
          fontColor: "#c5c9cc",
          fontSize: 12
        },
        pointLabelFontSize: 20
      }
    }

    return (
      <div>
        <section className="container-1-2">
          <div className="div-1">
            <div className="header">
              <div className="heading-div">
                <h1>Processes</h1>
              </div>
              <div className="button-div">
                <Button text="Add Process" icon="fas fa-plus" onClick={() => this.showAddProcessPopup(null, "add")} />
              </div>
            </div>
            <Table
              data={processData}
              columns={columns}
              actions={actions}
            />
            {processData.length === 0 ?
              null :
              <div className="popup-input-div white-text">
                <label>Enter Quantum for Round Robin: </label>
                <input className="form-input" type="number" name="quantum" value={quantum} onChange={this.handleChange} />
              </div>}

          </div>
          <div className="div-2">
            <Radar data={data} options={options} height="200" />
          </div>
        </section>

        {processData.length === 0 ?
          null :
          <section>
            <div className="calculate-button">
              <div className="lottie">
                <lottie-player src="https://assets8.lottiefiles.com/private_files/lf30_xkRFbO.json" background="transparent" speed="1" loop autoplay></lottie-player>
              </div>
              <div>
                <Button type="primary" onClick={this.calculate} text="Calculate" />
              </div>
            </div>
            <TabPanel
              tabs={tabs}
              handler={this.changeSelection}
              selection={selection}
            />
            {showCalculatedData ?
              <>
                {selection === 0 ?
                  <div>
                    <Table
                      data={processData}
                      columns={fcfsColumn}
                    />
                  </div> : null}
                {selection === 1 ?
                  <div>
                    <Table
                      data={processData}
                      columns={sjfColumn}
                    />
                  </div> : null}
                {selection === 2 ?
                  <div>
                    <Table
                      data={processData}
                      columns={priorityColumn}
                    />
                  </div> : null}
                {selection === 3 ?
                  <div>

                    {quantum === 0 ?
                      <span>Please enter quantum value</span> :
                      <Table
                        data={processData}
                        columns={rrColumn}
                      />}

                  </div> : null}
              </>
              : null}
          </section>}

        {
          addProcessPopup.show ?
            <Popup headline={addProcessPopup.headline} content={addProcessPopup.content} actions={addProcessPopup.actions} cancelAction={addProcessPopup.cancelAction} color={addProcessPopup.color} />
            : null
        }
      </div >
    );
  }
}

export default App;