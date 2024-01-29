import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import data from '../../../assets/data/quiz_data.json'

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css', './quiz.responsive.component.css']
})
export class QuizComponent implements OnInit {
  title: string = ''

  questions: any
  questionSelected: any

  answers: string[] = []
  answerSelected: string = ''

  questionMaxIndex: number = 0
  questionIndex: number = 0

  finished: boolean = false

  ngOnInit(): void {
    if (data) {
      this.finished = false
      this.title = data.title
      this.questions = data.questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoice(value: string) {
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex += 1
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const final: string = await this.checkResult(this.answers)
      this.finished = true
      //Como o dado está como any é necessário dizer como ele irá se comportar
      this.answerSelected = data.results[final as keyof typeof data.results]
    }
  }

  //Mapeando cada 'A' e 'B'
  async checkResult(answers: string[]) {
    const result = this.answers.reduce((previous, current, i, array) => {
      if (array.filter(item => item === previous).length > array.filter(item => item === current).length) {
        return previous
      } else {
        return current
      }
    })
    return result
  }
}