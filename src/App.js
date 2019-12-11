import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
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
      const { view } = this.state;

      const resolver = {
         html: this.renderHTML(),
         markdown: this.renderMarkdown()
      };

      const content = resolver[view] || <p className="loader-content">loading...</p>;

      return (
         <div className="App">
            <nav className="app-nav">
               <ButtonGroup size="sm" className="actions">
                  <Button
                     outline={view === 'markdown' ? false : true}
                     onClick={() => this.setState({ view: 'markdown' })}
                  >
                     Markdown
                  </Button>
                  <Button
                     outline={view === 'html' ? false : true}
                     onClick={() => this.setState({ view: 'html' })}
                  >
                     HTML
                  </Button>
                  <Button outline onClick={() => window.open('resume.pdf')}>
                     PDF
                  </Button>
               </ButtonGroup>
            </nav>
            {content}
         </div>
      );
   }
}
