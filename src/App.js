import ReactMarkdown from 'react-markdown'
import './App.css';
import { update } from './redux/markdownslice';
import { connect } from 'react-redux';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from "remark-gfm";




class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
}
  
  handleChange(event) {
    const newText = event.target.value;

    this.props.updateMarkdown(newText);
  }

  render() {
    
    return (
      <div className="markdownApp">
        <div id="text-area">
          <div id="editor-heading"><h3>Editor</h3></div>
          <textarea id="editor" onChange={this.handleChange} value={this.props.markdown}>
          </textarea>
        </div>
        <div id="preview-box">
          <div id="preview-heading"><h3>Previewer</h3></div>
          <div id="preview">
            <ReactMarkdown id="preview" remarkPlugins={[remarkGfm]}
               components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || ""); // Detects the language
                  return !inline && match ? (
                    <SyntaxHighlighter style={materialDark} language={match[1]} {...props}>
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}>
              {this.props.markdown}
              </ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    markdown: state.markdown.text,
  };
}


const mapDispatchToProps = (dispatch) => {
  return {
    updateMarkdown: (text) => {
      dispatch(update(text));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
