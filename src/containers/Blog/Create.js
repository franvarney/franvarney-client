import DebounceInput from 'react-debounce-input'
import React, {createClass} from 'react'
import SanitizeHtml from 'sanitize-html'
import Select, {Creatable} from 'react-select'

import BlogPost from '../../components/Blog/Post'
import Config from '../../config'
import DefaultLayout from '../../layouts/Default'
import Form from '../../components/Form/Wrapper'
import {Post} from '../../utils/sdk'
import TextRow from '../../components/Form/Text-Row'

const REQUIRED = [
  'title', 'summary', 'content',
  'category', 'tags', 'secret'
]

const DEFAULT_VALUES = { // for form and preview
  title: 'Title',
  category: 'Category',
  content: 'Add some text...',
  categories: [
    { value: 'development', label: 'Development' },
    { value: 'general', label: 'General' },
    { value: 'life', label: 'Life' },
    { value: 'photography', label: 'Photography' }
  ],
  tags: [
    { value: 'custom', label: 'Enter a value and hit enter', disabled: true }
  ]
}

const sanitizeOptions = {
  parser: {
    lowerCaseTags: true,
    recognizeSelfClosing: true
  }
}

const BlogCreate = createClass({
  getInitialState () {
    return {
      category: undefined,
      content: undefined,
      error: {
        message: undefined,
        key: undefined
      },
      height: '75%',
      post: {
        category: DEFAULT_VALUES.category,
        content: `<em>${DEFAULT_VALUES.content}</em>`,
        createdAt: new Date().toISOString(), // fake date
        isHtml: true,
        tags: [],
        title: DEFAULT_VALUES.title
      },
      secret: undefined,
      tags: undefined,
      title: undefined
    }
  },

  validate (data) {
    let invalidKey = null
    const isInvalid = REQUIRED.some((key) => {
      if (!data.hasOwnProperty(key) ||
          !data[key] ||
          !data[key].length) return (invalidKey = key, true)
      if (DEFAULT_VALUES[key] === data[key]) {
        return (invalidKey = key, true)
      }
      return false
    })

    if (invalidKey) {
      this.state.error.key = invalidKey
      this.setState(this.state)
      return false
    }

    return true
  },

  onChange (key, event) {
    this.state.post[key] = event.target.value
    this.setState(this.state)
  },

  onChecked (event) {
    this.state.post.isHtml = !event.target.checked
    this.setState(this.state)
  },

  resizeTextArea (event) {
    if (event.target.scrollHeight < 1500) { // TODO modify for mobile?
      event.target.style.height = `${25 + event.target.scrollHeight}px`
    }
  },

  onContentChange (event) {
    this.resizeTextArea(event)
    if (!this.state.isHtml) this.state.post.content = event.target.value
    else this.state.post.content = SanitizeHtml(event.target.value, sanitizeOptions)
    this.setState(this.state)
  },

  onCategoryChange (option) {
    this.state.category = option
    this.state.post.category = option.label
    this.setState(this.state)
  },

  onTagsChange (options) {
    this.state.tags = options
    this.state.post.tags = options.map((option) => option.value)
    this.setState(this.state)
  },

  submitPost (event) {
    event.preventDefault()
    this.setState({ error: {} })

    const post = Object.assign({}, this.state.post)
    delete post.createdAt

    const isValid = this.validate(post)
    if (!isValid) {
      this.state.error.message = `Invalid value for '${this.state.error.key}'!`
      return this.setState(this.state)
    }

    Post.create(post, (err, created) => {
      if (err) {
        this.state.error.message = err
        return this.setState(this.state)
      }
      return window.location = '/blog' // TODO change location?
    })
  },

  componentDidMount () {
    document.getElementById('text-title').focus()
  },

  render () {
    return (
      <DefaultLayout classes="page-blog-create">
        <div id="editor" className="column half">
          <h2>Create A Post</h2>
          <Form onSubmit={this.submitPost} error={this.state.error.message}>
            <TextRow names="Title">
              <input
                autoComplete="off"
                id="text-title"
                name="title"
                type="text"
                value={this.state.title}
                onChange={this.onChange.bind(this, 'title')} />
            </TextRow>
            <TextRow names="summary">
              <textarea
                autoComplete="off"
                id="text-summary"
                name="summary"
                value={this.state.summary}
                onChange={this.onChange.bind(this, 'summary')}  />
            </TextRow>
            <div id="markup-type" className="row">
              <hr className="divider" />
              <div className="column">
                <label className="inline" id="label-markup">Markup</label>
                <input
                  defaultChecked={true}
                  id="radio-markdown"
                  name="markup"
                  type="radio"
                  onChange={this.onChecked} />
                <span className="radio value" id="value-html">HTML</span>
                <input
                  defaultChecked={false}
                  id="radio-markdown"
                  name="markup"
                  type="radio"
                  onChange={this.onChecked} />
                <span className="radio value" id="value-markdown">Markdown</span>
              </div>
              <hr className="divider" />
            </div>
            <TextRow names="content">
              <DebounceInput
                debounceTimeout={300}
                element="textarea"
                id="text-content"
                minLength={2}
                name="content"
                style={{ height: this.state.height }}
                value={this.state.content}
                onChange={this.onContentChange} />
            </TextRow>
            <TextRow names={["Category", "Tags"]}>
              <Creatable
                clearable={false}
                id="select-category"
                multi={false}
                name="category"
                options={DEFAULT_VALUES.categories}
                value={this.state.category}
                onChange={this.onCategoryChange} />
              <Creatable
                clearable={false}
                id="select-tags"
                multi={true}
                name="tags"
                options={DEFAULT_VALUES.tags}
                value={this.state.tags}
                onChange={this.onTagsChange} />
            </TextRow>
            <TextRow names={["Secret"]}>
              {[<input
                  key="0"
                  autoComplete="off"
                  id="text-secret"
                  name="secret"
                  type="password"
                  onChange={this.onChange.bind(this, 'secret')}  />]}
            </TextRow>
          </Form>
        </div>
        <div id="output" className="column half">
          <BlogPost
            hasComments={false}
            editing={true}
            post={this.state.post} />
        </div>
      </DefaultLayout>
    )
  }
})

BlogCreate.displayName = 'BlogCreateContainer'

export default BlogCreate
