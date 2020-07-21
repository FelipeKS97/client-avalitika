import React, { useState } from "react";
import CustomBarChart from "../dashboard/CustomBarChart";
import ReportComments from "./ReportComments";

export default function ReportGenerator({
  answers,
  item,
  professor,
  discipline,
}) {
  let results = [];
  let data = [];

  discipline && professor && answers.map((answer) => {
    if (
      discipline.id === answer.class.discipline.id &&
      professor.professor_id === answer.class.professor.id
    ) {
      let parsedAnswer = JSON.parse(answer.json_answer);
      let result = parsedAnswer.filter((a) => a.name === item.field_name);

      results.push({ res: result[0], item });
    }
  });

  const generateData = () => {
    if (item.options) {
      data = item.options.map((op) => {
        let sum = results.filter((answer) => {
          if (Array.isArray(answer.res.value)) {
            return op.key === answer.res.value[0];
          } else {
            return op.key === answer.res.value;
          }
        }).length;
        return { total: sum, name: op.text };
      });
    } else {
      data = results.map((answer) => {
        return { text: answer.res.value };
      });
    }
  }
  
  discipline && professor && generateData()

  return (
    <>
      {item.options ? (
        <div
          style={{ display: "flex", justifyContent: "center", width: "85%" }}
        >
          <CustomBarChart data={data} />
        </div>
      ) : (
        <div>
          <ReportComments data={data} />
        </div>
      )}
    </>
  );
}
