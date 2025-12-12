
import { render, screen } from '@testing-library/react';
import AboutUs from './AboutUs';

describe("AboutUs Component", () => {
  it('renders the heading', () => {
    render(<AboutUs />);
    const sectionTitle = screen.getByRole('title');
    expect(sectionTitle).toBeInTheDocument();
    expect(sectionTitle).toHaveTextContent("About Plantify");
  });

  it('renders the description text', () => {
    render(<AboutUs />);
    const text = screen.getByRole('text');
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent("Plantify is your go-to store");
  });

  it("renders the plant image", () => {
    render(<AboutUs />);
    const image = screen.getByAltText("Plant");
    expect(image).toBeInTheDocument();
  });
});
