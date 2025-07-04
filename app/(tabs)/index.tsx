import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";

export default function TabOneScreen() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Welcome to the New Application");
  const [title, setTitle] = useState(
    "Hi Guest user welcome to the Neo Application"
  );
  const [deposit, setDeposit] = useState(0);
  const [selected, setSelected] = useState(null);
  const [users, setUsers] = useState(["John", "Jane", "Doe", "Smith"]);

  const handleClick = (item: any) => {
    alert(`You clicked on ${item}`);
    console.log("Clicked item:", item);
    setMessage(item.deposit || "No title found");
    setTitle(item.name || "No title found");
  };

  const settingDeposit = () => {
    setDeposit(count);
    alert(`Deposit is ${deposit}`);
    console.log("Deposit updated:", deposit);
  };

  useEffect(() => {
    if (count > 0) {
      setMessage(`Count is ${count}`);
    } else if (count < 0) {
      setMessage("Welcome to the Neo Application");
    }
    console.log("Component mounted or count changed:", count);
    setMessage(`Count is ${count}`);

    fetch("http://localhost:8080/employees")
      .then((response) => response.json())
      .then((data) => {
        const userNames = data.map((user: any) => user.name);
        setUsers(userNames);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [count]);

  return (
    <View style={styles.container}>
      <div></div>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{message}</Text>

      <div>
        {users.map((item: any, index: any) => (
          <div
            key={index}
            onClick={() => handleClick(item)}
            style={{
              cursor: "pointer",
              backgroundColor: selected === item ? "#d3f9d8" : "white",
              padding: "8px",
              margin: "4px 0",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      >
        <Button
          title="increment"
          onPress={() => setCount((prevState) => prevState + 10)}
        ></Button>
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      >
        <Button
          title="decrement"
          onPress={() => setCount((prevState) => prevState - 10)}
        ></Button>
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      >
        <Button title="Deposit" onPress={() => settingDeposit()}></Button>
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
});
