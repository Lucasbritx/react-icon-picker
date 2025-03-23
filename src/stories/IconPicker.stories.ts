import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import IconPicker from "../IconPicker";

const meta: Meta<typeof IconPicker> = {
  title: "Componentes/IconPicker",
  component: IconPicker,
  args: {
    title: "Selecione um ícone:",
  },
};

export default meta;

type Story = StoryObj<typeof IconPicker>;

export const Default: Story = {};