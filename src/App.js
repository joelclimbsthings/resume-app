import React from 'react';
import './App.css';

window.resizeIframe = obj => {
   console.log('running');
   obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
};

export default class App extends React.Component {
   resizeIframe = obj => {
      console.log('running');
      obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
   };

   render() {
      return (
         <div className="App">
            <header className="app-header">
               <button>Markdown</button>
               <button>HTML</button>
               <button>PDF</button>
            </header>

            <iframe
               title="HTML Resume"
               frameBorder="0"
               className="html-resume-view"
               src="https://joelt-assets.firebaseapp.com/resume.html"
               onLoad={event => this.resizeIframe(event.target)}
            ></iframe>
         </div>
      );
   }
}
