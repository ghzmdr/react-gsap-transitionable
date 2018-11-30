import React, {Component, createRef} from 'react'
import {Transition} from 'react-transition-group'

/**
 * @module react-gsap-transitionable
 * @description Enables painless [**GSAP**](https://greensock.com/gsap) integration
 * for in/out transitions along with [`react-transition-group` v2](https://github.com/reactjs/react-transition-group/)
 *
 * ### Features
 * + works with tweens or timelines
 * + can be used as decorator
 * + composes seamlessly (like with `react-redux`)
 *
 * @example
 * import GSAPTransition from 'react-grap-transitionable'
 *
 * class AnimatedComponent {
 *  constructor(props) {
 *    super(props)
 *  }
 *
 *  animationIn() {
 *    return TweenMax.from(this._ref.current, 0.4, {opacity: 0})
 *  }
 *
 *  animationOut() {
 *    return TweenMax.to(this._ref.current, 0.4, {opacity: 0})
 *  }
 *
 *  render() {
 *    return <div ref={this._ref}>Animated!</ref>
 *  }
 * }
 *
 * export default GSAPTransition(AnimatedComponent)
 *
 * @example
 * // With timeline, as decorator
 *
 * import GSAPTransition from 'react-grap-transitionable'
 *
 * \@GSAPTransition
 * class AnimatedComponent {
 *  constructor(props) {
 *    super(props)
 *  }
 *
 *  get timeline() {
 *    if (!this._timeline) {
 *      this._timeline = new TimelineMax({paused: true})
 *      this._timeline.fromTo(0.3, {x: -100, opacity: 0}, {x: 100, opacity: 1})
 *    }
 *
 *    return this._timeline
 *  }
 *
 *  animationIn() {
 *    return this.timeline.play()
 *  }
 *
 *  animationOut() {
 *    return this.timeline.reverse()
 *  }
 *
 *  render() {
 *    return <div ref={this._ref}>Animated!</ref>
 *  }
 * }
 *
 * export default AnimatedComponent
 *
 * @example
 * // Use it as you would with a normal `Transition` from `react-transition-group`
 * import {TransitionGroup} from 'react-transition-group'
 * import AnimatedComponent from './components/animated-component'
 *
 * const HomePage _ => <TransitionGroup>
 *  <AnimatedComponent />
 * </TransitionGroup>
 */
export default BaseComponent => {
  class GSAPTransition extends Component {
    constructor(props) {
      super(props)
      this._base = createRef()
    }

    componentWillUnmount() {
      this._killAnimation()
    }

    _killAnimation() {
      if (!this._animation) return

      this._animation.kill()
      this._animation.eventCallback('onComplete', null)
      this._animation.eventCallback('onReverseComplete', null)
      this._animation = null
    }

    addEndListener(show, done) {
      const method = this._base.current[show ? 'animationIn' : 'animationOut']
      if (!method) {
        done()
        return
      }

      this._animation = method.call(this._base.current)
      this._animation.eventCallback('onComplete', done)
      this._animation.eventCallback('onReverseComplete', done)
    }

    render() {
      const {in: show} = this.props
      return <Transition
        mountOnEnter
        unmountOnExit
        appear
        in={show}
        addEndListener={(_, done) => this.addEndListener(show, done)}>
        <BaseComponent
          ref={this._base}
          {...this.props}/>
      </Transition>
    }
  }

  return GSAPTransition
}

