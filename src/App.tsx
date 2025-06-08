import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Instrument {
  id: string;
  name: string;
}

function App() {
  const [instruments, setInstruments] = useState<Instrument[]>([]);

  useEffect(() => {
    async function getInstruments() {
      const { data, error } = await supabase.from("instruments").select("*");

      if (error) {
        return;
      }

      if (data) {
        setInstruments(data);
      }
    }

    getInstruments();
  }, []);

  return (
    <ul>
      {instruments.map((instrument) => (
        <li key={instrument.id}>{instrument.name}</li>
      ))}
    </ul>
  );
}

export default App;
