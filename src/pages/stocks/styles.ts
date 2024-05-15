import styled from "styled-components"

export const StocksTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  text-align: left;
  margin-top: 1rem;
  
  th {
    padding: 1rem;
    background-color: var(--ds-black-300);
  }
  
  td {
    padding: 1rem;
    border-bottom: 2px solid var(--ds-black-300);
  }
`
