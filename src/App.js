import React from 'react';
import './App.css';
import './resume.scss';

export default class App extends React.Component {
   state = {
      view: 'html',
      markdown: null,
      markup: null
   };

   async componentDidMount() {
      const [ markdown, markup ] = await Promise.all([ fetch('resume.md'), fetch('resume.html') ]);

      this.setState({
         markdown: await markdown.text(),
         markup: await markup.text()
      });
   }

   renderHTML() {
      const { markup } = this.state;

      return markup ? (
         <div
            className="html-content"
            dangerouslySetInnerHTML={{ __html: this.state.markup }}
         ></div>
      ) : null;
   }

   renderMarkdown() {
      const { markdown } = this.state;
      return markdown ? <div className="markdown-content">{markdown}</div> : null;
   }

   render() {
      const resolver = {
         html: this.renderHTML(),
         markdown: this.renderMarkdown()
      };

      const content = resolver[this.state.view] || <p className="loader-content">loading...</p>;

      return (
         <div className="App">
            <header className="app-header">
               <button onClick={() => this.setState({ view: 'markdown' })}>Markdown</button>
               <button onClick={() => this.setState({ view: 'html' })}>HTML</button>
               <button onClick={() => window.open('resume.pdf')}>PDF</button>
            </header>
            {content}
         </div>
      );
   }
}
