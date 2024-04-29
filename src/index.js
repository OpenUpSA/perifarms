import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './AppProvider';
import PeriFarms from './PeriFarms';
import Protect from 'react-app-protect'
import 'react-app-protect/dist/index.css'


function App() {
	
	return(
		<Protect sha512="4d9b236456af696a65bf5cb3435b1b168f1a7ec22d25c198b7b56b515b4d6c561652ca7e381d6af6f9278f5a1ee1875209d3ff68a2896815f588668a62b211f7">
			<Router>
				<AppProvider>
					<PeriFarms />
				</AppProvider>
			</Router>
		</Protect>
	)
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);