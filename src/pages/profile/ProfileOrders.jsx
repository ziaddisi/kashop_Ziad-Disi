import React from 'react'

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'


export default function ProfileOrders() {

  return (
    <Box>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: '25px',
        }}
      >
        My Orders
      </Typography>


      <TableContainer
        sx={{
          borderRadius: '12px',
          border: '1px solid #eeeeee',
          overflow: 'hidden',
        }}
      >

        <Table>

          <TableHead
            sx={{
              backgroundColor: '#f5f5f5',
            }}
          >

            <TableRow>

              <TableCell>
                Order ID
              </TableCell>

              <TableCell>
                Date
              </TableCell>

              <TableCell>
                Payment
              </TableCell>

              <TableCell>
                Total
              </TableCell>

              <TableCell>
                Status
              </TableCell>

            </TableRow>

          </TableHead>


          <TableBody>

            <TableRow>

              <TableCell
                colSpan={5}
                align="center"
                sx={{
                  py: '40px',
                }}
              >

                <Typography
                  color="text.secondary"
                >
                  No orders yet
                </Typography>

              </TableCell>

            </TableRow>

          </TableBody>

        </Table>

      </TableContainer>

    </Box>
  )
}