class status {
  TODO = 0;
  PROCESSING = 1;
  COMPLETED = 2;

  getClass(status) {
    switch (status) {
      case this.TODO:
        return "todo";
      case this.PROCESSING:
        return "process";
      case this.COMPLETED:
        return "completed";
      default:
        return "";
    }
  }

  getDisplayName(status) {
    switch (status) {
      case this.TODO:
        return "Todo";
      case this.PROCESSING:
        return "Processing";
      case this.COMPLETED:
        return "Completed";
      default:
        return "";
    }
  }
}

export default new status();
