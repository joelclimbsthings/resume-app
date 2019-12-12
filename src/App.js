import React from 'react';
import { Button, ButtonGroup, CustomInput } from 'reactstrap';
import './App.css';
import './resume.scss';

export default class App extends React.Component {
   state = {
      view: 'html',
      markdown: null,
      markup: null,
      dark: true
   };

   async componentDidMount() {
      this.setBodyClass(this.state.dark);
      await this.fetchSources();
   }

   async fetchSources() {
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

   setBodyClass(mode) {
      document.body.classList[mode ? 'add' : 'remove']('dark-mode');
   }

   toggleDarkMode() {
      this.setBodyClass(!this.state.dark);
      this.setState({
         dark: !this.state.dark
      });
   }

   render() {
      const { view, dark } = this.state;

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
                  <Button
                     outline
                     onClick={() => window.open(dark ? 'resume_dark.pdf' : 'resume.pdf')}
                  >
                     PDF
                  </Button>
               </ButtonGroup>
               <CustomInput
                  type="switch"
                  id="darkModeSwitch"
                  name="darkModeSwitch"
                  label="Dark Mode"
                  defaultChecked={dark}
                  onChange={e => this.setBodyClass(e.target.checked)}
               />
            </nav>
            {content}
         </div>
      );
   }
}
