import { Component, Prop } from '@stencil/core';
import moment from 'moment';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  @Prop() Test:string;

  yearField!: HTMLDivElement;
  hourSelection!: HTMLSelectElement;
  outputField!: HTMLDivElement;

  private year = moment().year();
  private months = moment.monthsShort();
  private days:string[] = [];
  private hours:string[] = [];

  private selectedDateTime = {
    year: this.year,
    month: this.months[0],
    day: "01",
    hour: "1 AM"
  }

  componentWillLoad() {
    this.days = [];
    for (let index = 1; index <= 31; index++) {
      if (index < 10) {
        this.days.push("0" + index.toString());
      } else {
        this.days.push(index.toString());
      }
    };
    this.hours = [];
    for (let index = 1; index <= 24; index++) {
      if (index <= 12) {
        this.hours.push(index.toString() + "AM");
      } else {
        this.hours.push((index - 12).toString() + "PM");
      }
    };
  }

  increaseYear() {
    this.selectedDateTime.year += 1;
    this.yearField.innerHTML = this.selectedDateTime.year.toString();
    this.updateOutput();
  }

  decreaseYear() {
    this.selectedDateTime.year -= 1;
    this.yearField.innerHTML = this.selectedDateTime.year.toString();
    this.updateOutput();
  }

  setMonth(month) {
    this.selectedDateTime.month = month;
    this.updateOutput();
  }

  setDay(day) {
    this.selectedDateTime.day = day;
    this.updateOutput();    
  }

  setHour() {
    this.selectedDateTime.hour = this.hourSelection.value;
    this.updateOutput();
  }

  updateOutput() {
    this.outputField.innerHTML = this.selectedDateTime.year + "/" + this.selectedDateTime.month + "/" + this.selectedDateTime.day + " at " + this.selectedDateTime.hour;
  }

  render() {
    return (
      <div>
        <div class="calander">
          <div class="grid-year-control">
            <div class="grid-item-arrow-left"><div class="leftarrow" onClick={this.decreaseYear.bind(this)}></div></div>
            <div class="grid-item-year" ref={(el) => this.yearField = el as HTMLDivElement}>{this.selectedDateTime.year}</div>
            <div class="grid-item-arrow-right"><div class="rightarrow" onClick={this.increaseYear.bind(this)}></div></div>
          </div>
          <div class="grid-container">
            {this.months.map((month) =>
              <div class="grid-item-month" onClick={this.setMonth.bind(this, month)}>{month}</div>  
            )}
          </div>
          <div class="grid-container">
            {this.days.map((day) =>
              <div class="grid-item-day" onClick={this.setDay.bind(this, day)}>{day}</div>  
            )}
          </div>
          <div>
            <select id="hourSelection" ref={(el) => this.hourSelection = el as HTMLSelectElement} onChange={this.setHour.bind(this)}>
              {this.hours.map((hour) =>
                <option>{hour}</option>  
              )}
            </select>
          </div>
          <div>Selected date and time: <div ref={(el) => this.outputField = el as HTMLDivElement}></div></div>
        </div>
      </div>
    );
  }
}
