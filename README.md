

# react-gsap-transitionable
[![npm](https://img.shields.io/npm/v/react-gsap-transitionable.svg?style=for-the-badge)](https://www.npmjs.com/package/react-gsap-transitionable)
[![npm bundle size (minified +
gzip)](https://img.shields.io/bundlephobia/minzip/react-gsap-transitionable.svg?style=for-the-badge)](https://bundlephobia.com/result?p=react-gsap-transitionable)
[![GitHub
issues](https://img.shields.io/github/issues/ghzmdr/react-gsap-transitionable.svg?style=for-the-badge)](https://github.com/ghzmdr/react-gsap-transitionable/issues)
[![License](https://img.shields.io/github/license/ghzmdr/react-gsap-transitionable.svg?style=for-the-badge)](https://github.com/ghzmdr/react-gsap-transitionable/blob/master/LICENSE)
[![Dependents (via
libraries.io)](https://img.shields.io/librariesio/dependents/npm/react-gsap-transitionable.svg?style=for-the-badge)](https://www.npmjs.com/package/react-gsap-transitionable)
[![David](https://img.shields.io/david/ghzmdr/react-gsap-transitionable.svg?style=for-the-badge)](https://github.com/ghzmdr/react-gsap-transitionable/blob/master/package.json)


Enables painless [**GSAP**](https://greensock.com/gsap) integration
for in/out transitions along with [`react-transition-group` v2](https://github.com/reactjs/react-transition-group/)

### Features
+ works with tweens or timelines
+ can be used as decorator
+ composes seamlessly (like with `react-redux`)

### Installation
```
npm i --save react-gsap-transitionable
```


### Usage

```javascript
import GSAPTransition from 'react-grap-transitionable'

class AnimatedComponent {
 constructor(props) {
   super(props)
 }

 animationIn() {
   return TweenMax.from(this._ref.current, 0.4, {opacity: 0})
 }

 animationOut() {
   return TweenMax.to(this._ref.current, 0.4, {opacity: 0})
 }

 render() {
   return <div ref={this._ref}>Animated!</ref>
 }
}

export default GSAPTransition(AnimatedComponent)
```

```javascript
// With timeline, as decorator

import GSAPTransition from 'react-grap-transitionable'

@GSAPTransition
class AnimatedComponent {
 constructor(props) {
   super(props)
 }

 get timeline() {
   if (!this._timeline) {
     this._timeline = new TimelineMax({paused: true})
     this._timeline.fromTo(this._ref.current, 0.3, {x: -100, opacity: 0}, {x: 100, opacity: 1})
   }

   return this._timeline
 }

 animationIn() {
   return this.timeline.play()
 }

 animationOut() {
   return this.timeline.reverse()
 }

 render() {
   return <div ref={this._ref}>Animated!</ref>
 }
}

export default AnimatedComponent
```

```javascript
// Use it as you would with a normal `Transition` from `react-transition-group`

import {TransitionGroup} from 'react-transition-group'
import AnimatedComponent from './components/animated-component'

const HomePage _ => <TransitionGroup>
 <AnimatedComponent />
</TransitionGroup>
```







