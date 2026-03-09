import styled from "styled-components"

type Props = {
  value: string
  onChange: (value: string) => void
}

const Container = styled.div`
  margin-bottom: 0;
  border-bottom: 1px solid #e5e7eb;
  position: relative;
`

const Input = styled.input`
  width: 95%;
  padding: 10px 40px 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 3px;
  font-size: 14px;
  background: #f9fafb;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: #ffffff;
    box-shadow: 0 0 0 2px rgba(59,130,246,0.2);
  }
`


const Icon = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #3b82f6;
  cursor: pointer;

  &:hover {
    color: #374151;
  }
`

export default function SearchBar({ value, onChange }: Props) {
  return (
    <Container>
      <Input
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && <Icon onClick={() => onChange("")}>×</Icon>}
    </Container>
  )
}
