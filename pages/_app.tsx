/* eslint-disable import/no-extraneous-dependencies */
import EventListeners from "@/components/EventListener/EventListener";
import { checkWindow } from "@/lib/functions/_helpers.lib";
import { store } from "@/reduxtoolkit/store/store";
import "@/styles/global.scss";
import MuiThemeProvider from "@/themes/MuiThemeProvider";
import createEmotionCache from "@/themes/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

/**
 * It suppresses the useLayoutEffect warning when running in SSR mode
 */
function fixSSRLayout() {
  // suppress useLayoutEffect (and its warnings) when not running in a browser
  // hence when running in SSR mode
  if (!checkWindow()) {
    React.useLayoutEffect = () => {
      // console.log("layout effect")
    };
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 0
    }
  }
});

export interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();
export default function CustomApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}: CustomAppProps) {
  fixSSRLayout();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={emotionCache}>
          <MuiThemeProvider>
            <CssBaseline />
            <Toaster richColors position="bottom-left" />

            <EventListeners />
            <Component {...pageProps} />
          </MuiThemeProvider>
        </CacheProvider>
      </QueryClientProvider>
    </Provider>
  );
}

/* Getting the current user from the server and passing it to the client. */
CustomApp.getInitialProps = async (context: AppContext) => {
  // // const client = initializeApollo({ headers: context.ctx.req?.headers });

  // // resetServerContext();
  const appProps = await App.getInitialProps(context);
  // return { user: data?.authenticatedItem, ...appProps };

  return { ...appProps };
};
