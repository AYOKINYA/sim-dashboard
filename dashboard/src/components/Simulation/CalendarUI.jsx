import React, { useState, useEffect } from 'react';
import axios from "axios";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from "react-modern-calendar-datepicker";
import HistoryTable from './HistoryTable';


import "./Calendar.css";

const CalendarUI = () => {

    const date = new Date();

    const defaultFrom = {
      year: date.getFullYear(),
      month: date.getMonth() < 12 ? date.getMonth() + 1 : 1,
      day: 13,
    };

    const defaultTo = {
      year: date.getFullYear(),
      month: date.getMonth() < 12 ? date.getMonth() + 1 : 1,
      day: 21,
    };

    const [selectedDayRange, setSelectedDayRange] = useState({
        from: defaultFrom,
        to: defaultTo
      });

    const getHistory = (e) => {
        e.preventDefault();
        console.log(selectedDayRange);

        if (selectedDayRange.from && selectedDayRange.to) {
            const startYear = String(selectedDayRange.from.year);
            const startMonth = selectedDayRange.from.month / 10 < 1 ? '0' + selectedDayRange.from.month : String(selectedDayRange.from.month)
            const startDay = selectedDayRange.from.day / 10 < 1 ? '0' + selectedDayRange.from.day : String(selectedDayRange.from.day)
            const startDate = startYear + startMonth + startDay

            const endYear = String(selectedDayRange.to.year);
            const endMonth = selectedDayRange.to.month / 10 < 1 ? '0' + selectedDayRange.to.month : String(selectedDayRange.to.month)
            const endDay = selectedDayRange.to.day / 10 < 1 ? '0' + selectedDayRange.to.day : String(selectedDayRange.to.day)
            const endDate = endYear +endMonth + endDay

            console.log("Send Request to Server");
            axios.get(process.env.REACT_APP_SERVER_ADDRESS_IP + `/simulation/history?startDate=${startDate}&endDate=${endDate}`)
                .then((res) => setdata(res.data))
                .catch((err) => console.error(err))
        }
    }
    const [data, setdata] = useState([]);

    useEffect(() => {

        const fetchData = () => {
            axios
            .get(process.env.REACT_APP_SERVER_ADDRESS_IP + "/simulation/history")
            .then(
                (res) => {
                    setdata(res.data);
                  }
                )
            .catch(
                (e) => console.error(e)
                );
            };

        fetchData();

    }, []);
    

    return (
        <div>
            <div className="sim-calendar-wrapper">
                <Calendar
                    value={selectedDayRange}
                    onChange={selectedDayRange => setSelectedDayRange(selectedDayRange)}
                    colorPrimary="rgba(0,44,95,1)"
                    colorPrimaryLight="rgba(191,205,217,1)"
                    shouldHighlightWeekends
                    calendarClassName="myCustomCalendar"
                    renderFooter={() => (
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                            <button 
                            onClick={(e) => getHistory(e)}
                            className="sim-calendar-btn"> 시뮬레이션 이력 조회
                            </button>
                        </div>)}
                />
            </div>
		    <HistoryTable data={data} />
        </div>

    );
}

export default CalendarUI;