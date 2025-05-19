import React from 'react';
import { calculateInvestmentResults, formatter } from '../util/investment';

const Results = ({ input }) => {
    const resultdata = calculateInvestmentResults(input);

    if (resultdata.length === 0) {
        return <p>No investment data available.</p>;
    }

    const initialInvestment =
        resultdata[0].valueEndOfYear -
        resultdata[0].interest -
        resultdata[0].annualInvestment;

    return (
        <table id="result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {resultdata.map((yearData) => {
                    const totalInterest =
                        yearData.valueEndOfYear -
                        yearData.annualInvestment * yearData.year -
                        initialInvestment;

                    const totalAmountInvested =
                        yearData.valueEndOfYear - totalInterest;

                    return (
                        <tr key={yearData.year}>
                            <td>{yearData.year}</td>
                            <td>{formatter.format(yearData.valueEndOfYear)}</td>
                            <td>{formatter.format(yearData.interest)}</td>
                            <td>{formatter.format(totalInterest)}</td>
                            <td>{formatter.format(totalAmountInvested)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Results;
