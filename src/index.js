import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './AppProvider';
import PeriFarms from './PeriFarms';


function App() {
	
	return(
		<Router>
			<AppProvider>
				<PeriFarms />
			</AppProvider>
		</Router>
	)
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);