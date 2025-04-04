import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

function App() {
  // Log when App component mounts to verify client-side code is executing
  useEffect(() => {
    console.log("App component mounted successfully");
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </Layout>
  );
}

export default App;
