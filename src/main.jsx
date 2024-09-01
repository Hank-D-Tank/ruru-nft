import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './components/routes/Home.jsx';
import SolanaProvider from './SolanaProvider.jsx'; 
import Upload from './components/routes/Upload.jsx';
import Explore from './components/routes/Explore.jsx';
import NftDetail from './components/routes/NftDetail.jsx';
import MyNFTs from './components/routes/MyNFTs.jsx';
import Error from './components/Error.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/upload-nft",
                element: <Upload/>,
            },
            {
                path: "/explore",
                element: <Explore/>,
            },
            {
                path: "/nft/:id",
                element: <NftDetail/>,
            },
            {
                path: "/myNFTs/:publicKey",
                element: <MyNFTs/>,
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <SolanaProvider>
            <RouterProvider router={router} />
        </SolanaProvider>
    </StrictMode>,
);
