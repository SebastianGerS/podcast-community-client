import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '../../Helpers/List';
import Podcast from '../../Models/Podcast';
import ListablePodcast from '../../Containers/ListablePodcast';


class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      podcast: '',
      category: {},
      idsNotInCategory: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.addToCategory = this.addToCategory.bind(this);
  }

  componentWillMount() {
    const { subscriptions, categories, categoryId } = this.props;
    const [category] = categories.filter(c => c._id === categoryId);
    const categorypodcastIds = category.podcasts.map(p => p.id);
    const subscriptionIds = subscriptions.map(subscription => subscription.id);
    const idsNotInCategory = subscriptionIds.filter(id => !categorypodcastIds.includes(id));
    this.setState({
      podcast: idsNotInCategory[0],
      category,
      idsNotInCategory,
    });
  }

  shouldComponentUpdate(nextProps) {
    const { categories, categoryId } = this.props;

    if (nextProps.categories !== categories) {
      const [category] = nextProps.categories.filter(c => c._id === categoryId);
      const categorypodcastIds = category.podcasts.map(p => p.id);
      const subscriptionIds = nextProps.subscriptions.map(subscription => subscription.id);
      const idsNotInCategory = subscriptionIds.filter(id => !categorypodcastIds.includes(id));
      this.setState({
        podcast: idsNotInCategory[0],
        category,
        idsNotInCategory,
      });
      return true;
    }
    return true;
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  addToCategory() {
    const { podcast, category } = this.state;
    const { addToCategory, userId } = this.props;
    addToCategory({ userId, categoryId: category._id, body: { podcasts: podcast } });
  }

  render() {
    const { subscriptions } = this.props;

    const { podcast, category, idsNotInCategory } = this.state;


    return (
      <div className="category">
        <h3>{category.name}</h3>
        { idsNotInCategory.length !== 0
          && (
          <form className="subscriptions">
            <select id="podcast" name="podcast" value={podcast} onChange={this.handleChange}>
              {subscriptions.map((subscription) => {
                if (idsNotInCategory.includes(subscription.id)) {
                  return <option key={subscription.id} id="podcast" value={subscription.id}>{subscription.title}</option>;
                }
                return null;
              })
            }
            </select>
            <button type="button" onClick={this.addToCategory} className="add-button">Add</button>
          </form>
          )
        }

        { category.podcasts.length !== 0
          ? <List component={ListablePodcast} data={category.podcasts} />
          : null}

      </div>
    );
  }
}
Category.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape(Podcast)).isRequired,
  subscriptions: PropTypes.arrayOf(PropTypes.shape(Podcast)).isRequired,
  userId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  addToCategory: PropTypes.func.isRequired,
};

export default Category;
