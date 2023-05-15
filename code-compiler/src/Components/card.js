import React from 'react'

export default function Card(props) {
  return (
    <div>
        <div>{props.firstName}</div>
        <div>{props.maxRating}</div>
        <div>{props.maxRank}</div>
    </div>
  )
}