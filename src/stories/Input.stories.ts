import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Input from "../Input";

const meta: Meta<typeof Input> = {
  title: "Componentes/Input",
  component: Input,
  args: {
    placeholder: "Digite algo...",
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const WithBorder: Story = {
  args: {
    style: { border: "2px solid red" },
  },
};