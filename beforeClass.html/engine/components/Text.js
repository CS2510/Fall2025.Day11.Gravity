class Text extends Component{
  fillStyle = "magenta"
  fontSize = 10
  fontName = "Arial"
  text = "[NO TEXT]"
  draw(ctx){
    ctx.fillStyle = this.fillStyle
    ctx.font = `${this.fontSize * this.transform.scale.y}px ${this.fontName}`
    ctx.fillText(this.text, this.transform.position.x, this.transform.position.y)
  }
}