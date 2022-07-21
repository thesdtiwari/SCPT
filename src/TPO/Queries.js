import React, { Component } from "react";
import { BASE_URL } from "../CONSTANTS";

async function answerQuery(id, answer) {
  try {
    console.log(answer);

    const data = await fetch(`${BASE_URL}/tpo/answer-query/${id}`, {
      method: "post",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer }),
    });

    if (data.status === 200) {
      alert("Answer submitted Successfully");
    } else {
      alert("Answer could not be submitted");
    }
    // console.log(data);
  } catch (err) {
    console.error("Error", err);
    return "error, please check console for details";
  }
}

class Queries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answeredQueries: [],
      unAnsweredQueries: [],
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
      .then(data => {
        const aq = data.filter(val => (val.answer ? true : false));
        const uq = data.filter(val => (val.answer ? false : true));

        this.setState({
          unAnsweredQueries: uq,
          answeredQueries: aq,
        });
      })
      .then(() => {
        console.log("all queries", this.state);
      });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(id) {
    answerQuery(id, this.state.value);
  }

  render() {
    return (
      <div className="flex flex-col overflow-hidden">
        {/*  Page content */}
        <div className="query__section">
          <div className="query__section-heading">
            <h3>Unanswered Student Queries</h3>
          </div>
          <main className="query__container ">
            {this.state.unAnsweredQueries.map(query => {
              return (
                <div className="query__card" key={query._id}>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      this.handleSubmit(query._id);
                    }}
                    key={query._id}
                  >
                    <h6>{query.question}</h6>
                    <h5>
                      Asked by : {query.askedBy.fullName} {", "}{" "}
                      {query.askedBy.enrollmentNumber}
                    </h5>
                    <div className="query__card-details">
                      <textarea
                        value={this.state.value}
                        onChange={this.handleChange}
                      />

                      <input
                        className="query_submit"
                        type="submit"
                        value={"Reply"}
                      />
                    </div>
                  </form>
                </div>
              );
            })}
          </main>
        </div>

        <div className="query__section">
          <div className="query__section-heading">
            <h3>Answered Student Queries</h3>
          </div>
          <main className="query__container ">
            {this.state.answeredQueries.map(query => {
              return (
                <div className="query__card" key={query._id}>
                  <form key={query._id}>
                    <h6>{query.question}</h6>
                    <h5>
                      Asked by : {query.askedBy.fullName} {", "}{" "}
                      {query.askedBy.enrollmentNumber}
                    </h5>
                    <div className="query__card-details">
                      <textarea
                        value={query.answer}
                        readOnly
                        style={{ resize: false, overflowY: "scroll" }}
                      />
                    </div>
                  </form>
                </div>
              );
            })}
          </main>
        </div>
      </div>
    );
  }
}

export default Queries;
