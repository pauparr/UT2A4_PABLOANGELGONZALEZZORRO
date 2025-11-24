import { useState, useEffect } from 'react';
import {
    Box, TextField, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, IconButton, Typography
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface ItemType {
    id?: number;
    nombre: string;
    marca: string;
    tipo: string;
    precio: number;
}

const itemInitialState: ItemType = {
    nombre: '',
    marca: '',
    tipo: '',
    precio: 0
};

export default function Dashboard() {
    const [item, setItem] = useState<ItemType>(itemInitialState);
    const [tableData, setTableData] = useState<ItemType[]>([]);

    const fetchItems = async () => {
        try {
            const response = await fetch('http://localhost:3030/getItems');
            const json = await response.json();
            setTableData(json.data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setItem(prev => ({
            ...prev,
            [name]: name === 'precio' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const queryParams = new URLSearchParams({
                nombre: item.nombre,
                marca: item.marca,
                tipo: item.tipo,
                precio: item.precio.toString()
            }).toString();

            const response = await fetch(`http://localhost:3030/addItem?${queryParams}`);
            const result = await response.json();

            if (result > 0) {
                alert('Datos guardados con éxito');
                setItem(itemInitialState);
                fetchItems();
            }
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const handleDeleteItem = async (row: ItemType) => {
        if (row.id === undefined) return;
        try {
            const response = await fetch(`http://localhost:3030/deleteItem?id=${row.id}`);
            const result = await response.json();
            if (result > 0) {
                fetchItems();
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>Añadir Nuevo Item</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                    <TextField
                        label="Nombre"
                        name="nombre"
                        value={item.nombre}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Marca"
                        name="marca"
                        value={item.marca}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Tipo"
                        name="tipo"
                        value={item.tipo}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Precio"
                        name="precio"
                        type="number"
                        value={item.precio}
                        onChange={handleInputChange}
                        required
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        startIcon={<AddCircleOutlineIcon />}
                    >
                        INSERTAR DATOS
                    </Button>
                </Box>
            </Paper>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Eliminar</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Precio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <IconButton color="error" onClick={() => handleDeleteItem(row)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>{row.nombre}</TableCell>
                                <TableCell>{row.marca}</TableCell>
                                <TableCell>{row.tipo}</TableCell>
                                <TableCell>{row.precio} €</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
