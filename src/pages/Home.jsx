  import React, { Component } from "react";
import CarArea from "../partials/CarArea";
import ChooseUs from "../partials/ChooseUs";
import CountArea from "../partials/CountArea";
import FindCar from "../partials/FindCar";
import OurDeal from "../partials/OurDeal";
import Slider from "../partials/Slider";
import Testimonials from "../partials/Testimonials";

  export default class Home extends Component {
    state = {
      scrollDirection: "down",
    };

    componentDidMount() {
      this.scrollPosition = window.scrollY;
      window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
      const currentScroll = window.scrollY;
      // Check if the scroll direction has changed
      if (
        currentScroll > this.scrollPosition &&
        this.state.scrollDirection !== "down"
      ) {
        this.setState({ scrollDirection: "down" });
      } else if (
        currentScroll < this.scrollPosition &&
        this.state.scrollDirection !== "up"
      ) {
        this.setState({ scrollDirection: "up" });
      }
      this.scrollPosition = currentScroll;
    };

    render() {
      const { scrollDirection } = this.state;

      return (
        <>
          <main className="main">
            <Slider scrollDirection={scrollDirection} />
            <FindCar />
            <CarArea scrollDirection={scrollDirection} />
            <CountArea scrollDirection={scrollDirection} />
            <ChooseUs scrollDirection={scrollDirection} />
            {/* <AboutArea scrollDirection={scrollDirection} /> */}
            <OurDeal />
            <Testimonials />
          </main>
        </>
      );
    }
  }
