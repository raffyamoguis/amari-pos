import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  NumberInput,
  Table,
  ActionIcon,
  Group,
  Divider,
  Button,
  Paper,
  ScrollArea,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconSearch, IconTrash, IconX } from "@tabler/icons-react";
import { TransactionTypes } from "../../types";
import { amountShorthand } from "../../lib/transactions/data";
import "./searchStyle.css";
import axios from "axios";
import BadgeStock from "../BadgeStock";

const API_HOST = import.meta.env.VITE_API_HOST;

const NewTrans: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [, setQuantity] = useState<number | "">(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [change, setChange] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [safeToProceed, setSafe] = useState<boolean>(true);

  const [transactions, setTransactions] = useState<TransactionTypes[]>([]);
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    // Fetch data
    if (search !== "") searchProducts();
  }, [search]);

  async function searchProducts() {
    try {
      const { data } = await axios.get(`${API_HOST}/products?name=${search}`);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // Calculate and update the total value
    const totalValue = transactions.reduce(
      (total, transaction) => total + transaction.total,
      0
    );
    setTotalValue(totalValue);
  }, [transactions]);

  async function addTransaction(product: any) {
    if (product.quantity !== 0) {
      //Check for redundancy
      let redundant = false;
      const updatedTransactions = transactions.map((transaction) => {
        if (transaction.product === product.stockfor) {
          redundant = true;

          // Prevent over adding quantity
          if (product.quantity > transaction.quantity) {
            transaction.quantity += 1;
          }

          // Add quantity instead..
          return {
            ...transaction,
            quantity: transaction.quantity,
            total: transaction.price * transaction.quantity,
          };
        }
        return transaction;
      });

      setTransactions(updatedTransactions);

      // Check before adding..
      if (!redundant) {
        try {
          const result = await axios.get(
            `${API_HOST}/products/${encodeURIComponent(product.stockfor)}`
          );
          const medicine = result.data;
          const price = parseFloat(medicine.price);
          const transaction = [
            ...transactions,
            {
              id: transactions.length + 1,
              product: product.stockfor,
              stock: product.quantity,
              price: price,
              quantity: 1,
              total: price,
            },
          ];

          setTransactions(transaction);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  function handleQuantityChange(id: number, value: number | "", stock: number) {
    if (value === "") {
      // Handle the case where value is an empty string
    } else {
      // Handle the case where value is a number
      if (stock >= value) {
        const updatedTransactions = transactions.map((transaction) => {
          if (transaction.id === id) {
            const newTotal = transaction.price * value;
            return { ...transaction, quantity: value, total: newTotal };
          }
          return transaction;
        });

        setTransactions(updatedTransactions);
      }
    }
  }

  function handleDelete(id: number) {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );

    setTransactions(updatedTransactions);
  }

  function handleAmountChange(amount: number | "") {
    if (amount !== "" && totalValue !== 0) {
      setAmount(amount);
      const checkChange = amount - totalValue;
      if (checkChange >= 0) {
        setChange(checkChange);
        setSafe(false);
      } else {
        setSafe(true);
        setChange(0);
        notifications.show({
          title: "Error",
          message: "Amount should be greater than total.",
          color: "red",
        });
      }
    }
  }

  return (
    <>
      <Text mb={10}>New Transactions</Text>

      <div className="search-container">
        <TextInput
          mb={4}
          w={300}
          placeholder="Enter product name"
          icon={<IconSearch size="0.8rem" />}
          rightSection={
            search !== "" && (
              <IconX size="0.8rem" onClick={() => setSearch("")} />
            )
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <Paper
            shadow="xs"
            className="search-results"
            sx={(theme) => ({
              padding: theme.spacing.sm,
            })}
          >
            <ScrollArea h={250}>
              {products.length !== 0 ? (
                products?.map((product: any) => (
                  <Group
                    key={product.id}
                    position="apart"
                    px="lg"
                    py="xs"
                    align="center"
                    sx={(theme) => ({
                      "&:hover": {
                        backgroundColor:
                          theme.colorScheme === "dark"
                            ? theme.colors.gray[8]
                            : theme.colors.gray[0],
                        cursor:
                          product.quantity > 0 ? "pointer" : "not-allowed",
                      },
                    })}
                    onClick={() => addTransaction(product)}
                  >
                    <Text fz="sm">{product.stockfor}</Text>
                    <BadgeStock value={product.quantity} />
                  </Group>
                ))
              ) : (
                <Text color="gray" size="sm">
                  No results found.
                </Text>
              )}
            </ScrollArea>
          </Paper>
        )}
      </div>
      {transactions.length !== 0 && (
        <>
          <Table fontSize="xs">
            <thead>
              <tr>
                <th>Product</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction: TransactionTypes) => (
                <tr key={transaction.id}>
                  <td>{transaction.product}</td>
                  <td>{transaction.stock}</td>
                  <td>{transaction.price}</td>
                  <td>
                    <NumberInput
                      sx={{ width: "70px" }}
                      value={transaction.quantity}
                      onChange={(newValue) => {
                        setQuantity(newValue); // Update quantity state
                        handleQuantityChange(
                          transaction.id,
                          newValue,
                          transaction.stock
                        );
                      }}
                      max={transaction.stock}
                      min={1}
                    />
                  </td>
                  <td>{transaction.total}</td>
                  <td>
                    <ActionIcon
                      color="red"
                      size="sm"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      <IconTrash size="0.875rem" />
                    </ActionIcon>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Divider />
        </>
      )}

      <Group mt={20} position="right" align="end">
        <NumberInput
          label="Total"
          value={totalValue}
          maw={70}
          hideControls
          disabled
        />
        <NumberInput
          label="Change"
          value={change}
          maw={70}
          hideControls
          disabled
        />
        <NumberInput
          label="Amount"
          value={amount}
          onChange={(value) => handleAmountChange(value)}
          maw={80}
          min={0}
        />
        <Button
          onClick={() => console.log(transactions)}
          disabled={safeToProceed}
        >
          Proceed
        </Button>
      </Group>
      <Group mt={15} position="right" align="center" spacing="xs">
        {amountShorthand.map((amount, key) => (
          <Button
            key={key}
            variant="light"
            color="gray"
            size="xs"
            onClick={() => handleAmountChange(amount)}
          >
            {amount}
          </Button>
        ))}
      </Group>
    </>
  );
};

export default NewTrans;
