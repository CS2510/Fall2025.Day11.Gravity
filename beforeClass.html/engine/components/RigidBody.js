class RigidBody extends Component {
  acceleration = new Vector2(0, 0)
  velocity = new Vector2(0, 0)
  gravity = new Vector2(0, 0)
  update() {
    const originalPosition = this.transform.position.clone()
    this.velocity.plusEquals(this.acceleration.times(Time.deltaTime))
    this.velocity.plusEquals(this.gravity.times(Time.deltaTime))
    this.transform.position.plusEquals(this.velocity.times(Time.deltaTime))
  }
}
