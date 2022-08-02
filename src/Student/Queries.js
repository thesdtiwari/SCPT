import React, { Component } from "react";
import { BASE_URL } from "../CONSTANTS";

async function askQuery(question, fun) {
  try {
    console.log(question);

    const data = await fetch(`${BASE_URL}/students/ask-query`, {
      method: "post",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (data.status === 200) {
      alert("Query submitted Successfully");
      return {status: 200};
    } else {
      alert("Query could not be submitted");
    }
    // console.log(data);
  } catch (err) {
    console.error("Error in updating Linkedln URL", err);
    return "error, please check console for details";
  }
}

class Queries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queries: [],
      value : ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(`${BASE_URL}/all-query`, {
      method: "get",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
      },
    })
      .then(val => val.json())
      .then(data => this.setState({ queries: data }))
      .then(() => {
        console.log("all queries", this.state.queries);
      });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    // const status = await askQuery(this.state.value, this.handleChange);
    document.getElementById("textarea_query").value = "";
    
    fetch(`${BASE_URL}/all-query`, {
      method: "get",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
      },
    })
      .then(val => val.json())
      .then(data => this.setState({ queries: data }))
      .then(() => {
        console.log("all queries", this.state.queries);
      });

  }

  // console.log(errors);

  render() {
    return (
      <div className="flex flex-col overflow-hidden">
        {/*  Page content */}
        <div className="stuquery__section">
          <h3 className="stuquery__section-heading">Queries</h3>
          <main className="stuquery__container flex-grow">
            <form className="stuquery__form" onSubmit={this.handleSubmit}>
              <textarea id="textarea_query" value={this.state.value} onChange={this.handleChange} />

              <input type="submit" value={"Submit"} />
            </form>

            <div> </div>
          </main>
        </div>

        <div className="stuquery__section">
          <h3 className="stuquery__section-heading">Old Queries</h3>

          <main className="stuquery__container flex-grow">
            <div className="query__section">
              <main className="query__container ">
                {this.state.queries?.map((query, ind) => {
                  return (
                    <div className="query__card" key={ind}>
                      <form>
                        <h6>{query.question}</h6>
                        <div className="query__card-details">
                          <textarea
                            placeholder="has not been answered yet by TPO"
                            value={query.answer}
                            readOnly
                            style={{ resize: false, overflowY: "scroll" }}
                          />
                        </div>
                      </form>
                    </div>
                  );
                })}

                {/* <div className="query__card">
                  <form onSubmit={handleSubmit(askQuery)}>
                    <h6>Ques. Are placements Online or offline ?</h6>
                    <div className="query__card-details">
                      <textarea
                        placeholder="type your answer...."
                        value={"dasms smsdsa dasd"}
                      />
                    </div>
                  </form>
                </div>

                <div className="query__card">
                  <form onSubmit={handleSubmit(askQuery)}>
                    <h6>
                      Ques. Are placements Online or offlineAre placements
                      Online or offlineAre placements Online or offline Are
                      placements Online or offline ?
                    </h6>
                    <div className="query__card-details">
                      <textarea
                        placeholder="type your answer...."
                        value={"dasdasdas das dasd asd asd hume kya pta"}
                      />
                    </div>
                  </form>
                </div> */}
                {/* 
                  <div className="query__card"> 
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <h6>Ques.  Are placements Online or offlineAre placements Online or offlineAre placements Online or offline Are placements Online or offline ?</h6>
                      <h5>Asked by : EDT</h5>
                      <div className="query__card-details">
                      <textarea {...register("Query", {})}    placeholder="type your answer...." />
                      
                        <input className="query_submit" type="submit"  value={"Reply"} />
                      </div>
                    </form> 
                  </div> */}
              </main>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Queries;
